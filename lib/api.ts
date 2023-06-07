import Constants from "expo-constants";
import useSWR from "swr";

const { apiUrl } = Constants.expoConfig?.extra || {};

export declare type Patient = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nhsNumber: string;
  phoneNumber: string;
};

export declare type Clinic = {
  title: string;
  date: string;
};

async function apiRequest(url: string, method = "GET", data?: object) {
  const options: RequestInit = {
    method,
  };

  if (typeof data !== undefined) {
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${apiUrl}${url}`, options);
  const result = await response.json();

  if (response.status != 200) {
    throw new Error(`API call failed: ${result.error}`);
  }

  return result;
}

export function useNotifications() {
  return useSWR("/api/notifications", apiRequest, {
    refreshInterval: 500,
  });
}

export async function createNotification(lateness: number) {
  await apiRequest("/api/notifications", "POST", { lateness });
}

export async function deleteNotification(id: number) {
  await apiRequest(`/api/notifications/${id}`, "DELETE");
}

export async function notifySMS(recipient: string, lateness: number) {
  await apiRequest("/api/send", "POST", { recipient, lateness });
}

export function usePatients(params?: { dateOfBirth?: string }) {
  return useSWR<[Patient], Error>(
    "/api/patients?" + new URLSearchParams(params),
    apiRequest
  );
}

export function useClinics(params?: { date?: string }) {
  return useSWR("/api/clinics?" + new URLSearchParams(params), apiRequest);
}

export async function createClinic(date: string, title: string) {
  await apiRequest("/api/clinics", "POST", { date, title });
}
