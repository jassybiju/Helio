'use client'

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { authService, } from "../service/auth.service"

export const useMe = () => {
  return useQuery({
    queryKey : ['me'],
    queryFn : authService.getMe,
    retry : false,
    staleTime : 1 * 60 * 1000,
  })
}