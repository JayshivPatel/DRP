const gulp = require("gulp");

const execa = require("execa");
const fs = require("fs/promises");
const waitOn = require("wait-on");

function npx(command: string, args: String[], options?: any): any {
  return execa(
    command,
    args,
    Object.assign(
      {
        preferLocal: true,
        stderr: "inherit",
        stdout: "inherit",
      },
      options
    )
  );
}

async function vercel(...args: string[]): Promise<string> {
  const maybeToken = process.env.VERCEL_TOKEN
    ? [`--token=${process.env.VERCEL_TOKEN}`]
    : [];

  const { stdout } = await npx("vercel", [...maybeToken, ...args], {
    stdout: "pipe",
  });
  return stdout;
}

gulp.task("build:expo", async () => {
  await npx("expo", ["export:web"], {
    env: {
      /* Export the frontend to the Next.js static folder */
      WEBPACK_BUILD_OUTPUT_PATH: "public",
    },
  });
});

gulp.task("build:next", async () => {
  await npx("next", ["build"]);
});

gulp.task("build", gulp.series("build:expo", "build:next"));

function escapeShell(s: string): string {
  return "'" + s.replaceAll("'", "'\\''") + "'";
}

async function deploy(production: boolean) {
  const environment = production ? "production" : "preview";
  const maybeProd = production ? ["--prod"] : [];

  await vercel("pull", "--yes", `--environment=${environment}`);
  await vercel("build", ...maybeProd);
  const url = await vercel("deploy", ...maybeProd, "--prebuilt");

  /* Write deployment URL to dotenv file for GitLab CI */
  await fs.writeFile("deploy.env", `DEPLOYMENT_URL=${escapeShell(url)}\n`);
}

gulp.task("deploy:preview", () => deploy(false));
gulp.task("deploy:production", () => deploy(true));

gulp.task(
  "test",
  gulp.series("build:next", async () => {
    const port = 3000;
    const server = npx("next", ["start", "--port", `${port}`]);
    const url = `http://localhost:${port}`;

    try {
      await waitOn({
        resources: [url],
        delay: 1000,
        timeout: 5000,
        validateStatus: () => true,
        verbose: true,
      });

      await npx("jest", [], {
        env: {
          API_URL: url,
        },
      });
    } finally {
      server.kill();
    }
  })
);
