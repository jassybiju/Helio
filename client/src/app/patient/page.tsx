import React, { Suspense } from 'react'

const page = () => {
  console.log(1)

  return (
    <Suspense fallback={"Laoding"}>

    <div className='text-red-800'>Home</div>
    </Suspense>
  )
}

export default page