import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { getUserByClerkId } from '@/actions/user.action';
import SidebarClient from './SidebarClient';
import UnAuthenticatedSidebar from './UnAuthenticatedSidebar';

async function Sidebar() {
    const authUser = await currentUser();
    if(!authUser) return <UnAuthenticatedSidebar/>

    const user = await getUserByClerkId(authUser.id);
    if(!user) return null ;

    return <SidebarClient user={user} />;
}

export default Sidebar

