import { Button } from '@/components/ui/button'
import { SignUpButton } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
   <div>
    <h1>HomePage</h1>
    <SignUpButton mode='modal'>Sign Up</SignUpButton>
   </div>
  )
}

export default page
