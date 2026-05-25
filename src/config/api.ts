export const getApiUrl = (): string => {
  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv) return fromEnv;

  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || /^192\.168\./.test(window.location.hostname))
  ) {
    return "http://localhost:8080";
  }

  return "https://ngum-alu-chatbot.hf.space";
};

export const API_URL = getApiUrl();

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout = 10000
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const res = await fetchWithTimeout(API_URL, {}, 5000);
    return res.ok;
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
};
