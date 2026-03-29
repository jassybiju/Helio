'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

type PropType ={
  children : React.ReactNode
}

const QueryProvider = ({children} : PropType) => {
  const [queryClient] = useState(()=>new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider