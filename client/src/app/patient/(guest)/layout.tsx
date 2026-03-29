import GuestLayout from '@/src/layout/GuestLayout'
import React from 'react'

type PropType = {
  children : React.ReactNode
}

const layout = ({children} : PropType ) => {
  return (
    <GuestLayout>{children}</GuestLayout>
  )
}

export default layout