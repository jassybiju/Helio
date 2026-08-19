export interface RuntimeConfig {
  backendUrl: string;
  backendWsUrl: string;
  RazorpayURL: string;
  googleClientID: string;
}

let runtimeConfig: RuntimeConfig | null = {
  backendUrl: "http://api.helixo.com/v1/api",
  backendWsUrl: "http://api.helixo.com/",
  RazorpayURL: "rzp_test_TAgRpqGy9zO1UT",
  googleClientID:
    "603438853272-qr8nh9lnf9i1kni8rggt670ghk8nbt7t.apps.googleusercontent.com",
};

export async function initializeRuntimeConfig() {
  const response = await fetch("/runtime-config.json", {
    cache: "no-store",
  }); 

  if (!response.ok) {
    throw new Error("Failed to load runtime configuration");
  }

  runtimeConfig = await response.json();
}

export function getRuntimeConfig(): RuntimeConfig {
  if (!runtimeConfig) {
    throw new Error("Runtime config has not been initialized");
  }

  return runtimeConfig;
}