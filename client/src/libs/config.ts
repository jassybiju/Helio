
export interface RuntimeConfig {
  backendUrl: string;
  backendWsUrl: string;
  RazorpayURL : string,
  googleClientID : string
}

let runtimeConfig: RuntimeConfig | null = null;

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