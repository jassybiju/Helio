"use client";

import { useEffect, useState } from "react";
import { initializeRuntimeConfig } from "../libs/config";

export function ApiConfigProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initializeRuntimeConfig()
      .then(() => setInitialized(true))
      .catch(setError);
  }, []);

  if (error) {
    throw error;
  }

  if (!initialized) {
    return null;
  }

  return children;
}
