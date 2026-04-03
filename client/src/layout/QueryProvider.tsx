"use client";



import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { queryClient } from "../libs/queryClient";

type PropType = {
  children: React.ReactNode;
};

const QueryProvider = ({ children }: PropType) => {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;
