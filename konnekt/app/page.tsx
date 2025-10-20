
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import CreatePost from '@/components/CreatePost';

async function Home() {
  const user = await currentUser();
  return (
    <div className='grid grid-cols-1 lg:grid-cols-10'>
      <div className='lg:col-span-6'>
          {user ? <CreatePost/> : null}
      </div>
      <div className='hidden lg:block lg:col=span-4 sticky top-20'>
        Find User
      </div>
      
    </div>
  )
}

export default Home