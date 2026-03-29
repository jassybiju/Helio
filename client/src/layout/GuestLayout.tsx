'use client'
import React, { useEffect } from 'react'
import { useMe } from '../features/auth/hooks/useMe';
import { redirect, useRouter } from 'next/navigation';
import { getSubdomain } from '../utils/getSubdomain';
import { redirectToRoleDashboard } from '../utils/redirectToRoleDashboard';
import { getExpectedSubdomain } from '../utils/getExpectedSubdomain';

type PropType = {
  children: React.ReactNode;
};

const GuestLayout = ({children}: PropType) => {
  console.log("REDIRECTED to GUEST")
  const {data, isLoading} = useMe()
  const router = useRouter()
  useEffect(()=>{
    if(isLoading) return

    if(data){
      const currentSubdomaian = getSubdomain()
      const expectedSubdomain = getExpectedSubdomain(data.data.role)
      if(currentSubdomaian !== expectedSubdomain){
        redirectToRoleDashboard(data.data.role)
      }else{
        router.replace('/')
      }
    }
  },[data, isLoading])

  if(isLoading){
    return 'is Loading.....'
  }

  if(data){
    return null
  }

  return (
    <>{children}</>
  )
}

export default GuestLayout