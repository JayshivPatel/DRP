import Constants from "expo-constants";

const { apiUrl } = Constants.expoConfig?.extra || {};

export async function notifySMS(recipient: string, lateness: number) {
  const response = await fetch(
    `${apiUrl}/api/send?${new URLSearchParams({
      recipient,
      lateness: lateness.toString(),
    })}`,
    {
      method: "POST",
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to send notification");
  }
}
