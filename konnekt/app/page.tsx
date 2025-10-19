import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ui/toggle-mode'
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

function Home() {
  return (
    <div>
      {/* if signed out show signin and signup button */}
      <SignedOut>
          <SignInButton mode='modal'>
            <Button>Sign In</Button>
          </SignInButton> 
          {/* modal avoids redirect */}
          <SignUpButton mode='modal'>
              <Button variant='secondary'>Sign Up</Button>
          </SignUpButton>
      </SignedOut>
      {/* if signed in show user button */}
      <SignedIn>
        <UserButton />
      </SignedIn>
      <ModeToggle/>
    </div>
  )
}

export default Home