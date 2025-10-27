import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
} from "@/components/ui/sidebar"
import Listprojects from "./Projects"
import { useSelector } from "react-redux"
import type { StateType } from "@/redux/store"
import { CircleUserRound } from 'lucide-react'
export function AppSidebar() {
    const username = useSelector((state: StateType) => state.themeSlice.user.username);
    return (
        <div className="">
            <Sidebar className="flex flex-col mb-2 h-[calc(100dvh-60px)] fixed top-15">
                <SidebarContent className="flex-1">
                    <Listprojects />
                </SidebarContent>
                <SidebarFooter className="h-12 mb-1">
                    <div className="text-2xl font-medium font-doto px-4 flex h-full items-center justify-center gap-2" ><CircleUserRound className="scale-100 relative top-px"/>{username}</div>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}