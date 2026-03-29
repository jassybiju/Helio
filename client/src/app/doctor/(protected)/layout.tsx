import ProtectedLayout from '@/src/layout/ProtectedLayout'
import React from 'react'

type PropType = {
  children : React.ReactNode
}

const layout = ({children} : PropType) => {
  return (
    <ProtectedLayout role='doctor'>{children}</ProtectedLayout>
  )
}

export default layout