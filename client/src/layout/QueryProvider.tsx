'use client'

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__:
      import('@tanstack/query-core')
        .QueryClient
  }
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { useState } from 'react'

type PropType ={
  children : React.ReactNode
}

const QueryProvider = ({children} : PropType) => {
  const [queryClient] = useState(()=>new QueryClient())


  return (
    <QueryClientProvider client={queryClient}>{children}
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default QueryProvider