const gulp = require("gulp");

const dotenv = require("dotenv");
const execa = require("execa");
const fs = require("fs/promises");
const waitOn = require("wait-on");

function npx(command: string, args: String[], options?: any): any {
  return execa(command, args, {
    preferLocal: true,
    stderr: "inherit",
    stdout: "inherit",
    ...options,
  });
}

async function vercel(args: string[], options?: any): Promise<string> {
  const maybeToken = process.env.VERCEL_TOKEN
    ? [`--token=${process.env.VERCEL_TOKEN}`]
    : [];

  const { stdout } = await npx("vercel", [...maybeToken, ...args], {
    stdout: "pipe",
    ...options,
  });
  return stdout;
}

gulp.task("build:expo", async () => {
  await npx("expo", ["export", "-p", "web", "--output-dir", "public"], {
    env: {
      EXPO_PUBLIC_FOLDER: "dummy-folder-does-not-exist",
    },
  });
});

gulp.task("build:next", async () => {
  await npx("prisma", ["generate"]);
  await npx("next", ["build"]);
});

gulp.task("build", gulp.series("build:expo", "build:next"));

function escapeShell(s: string): string {
  /* All characters are allowed within single quotes, except single quotes */
  return "'" + s.replaceAll("'", "'\\''") + "'";
}

async function deploy(production: boolean) {
  const environment = production ? "production" : "preview";
  const maybeProd = production ? ["--prod"] : [];

  /* Pull environment variables for local build */
  await vercel(["pull", "--yes", `--environment=${environment}`]);
  const env = dotenv.parse(
    await fs.readFile(`.vercel/.env.${environment}.local`)
  );

  /* Build application locally */
  await vercel(["build", ...maybeProd], { env });
  /* Deploy database migrations */
  await npx("prisma", ["migrate", "deploy"], { env });
  /* Deploy application */
  const url = await vercel(["deploy", ...maybeProd, "--prebuilt"]);

  /* Write deployment URL to dotenv file for GitLab CI */
  await fs.writeFile("deploy.env", `DEPLOYMENT_URL=${escapeShell(url)}\n`);
}

gulp.task("deploy:preview", () => deploy(false));
gulp.task("deploy:production", () => deploy(true));
