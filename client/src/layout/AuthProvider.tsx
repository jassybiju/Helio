'use client'

import React, { createContext } from 'react'
import { USER_DATA, } from '../types/user.types'
import { useMe } from '../features/auth/hooks/useMe'

export const AuthContext = createContext<{user? : USER_DATA | undefined, isLoading : boolean, isError : boolean}>({isLoading : false, isError : false})

type PropType = {
  children : React.ReactNode
}

const AuthProvider = ({children} : PropType) => {
  const {data ,isLoading,isError } = useMe()
  console.log(data,"DATAAA")
  return (
    <AuthContext.Provider value={{user : data?.data, isLoading,isError}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider