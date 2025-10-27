import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Listprojects from "./Projects"
import { useSelector } from "react-redux"
import type { StateType } from "@/redux/store"

export function AppSidebar() {
    const username = useSelector((state:StateType)=>state.themeSlice.user.username) ;
    return (
        <div className="">
            <Sidebar className="flex flex-col mb-2 h-[calc(100dvh-60px)] fixed top-15">
                <SidebarContent className="flex-1 m-1 mb-0">
                    <Listprojects/>
                </SidebarContent>
                <SidebarFooter className="h-12 m-1 rounded border mb-1 flex justify-center">
                    <div className="text-2xl font-medium font-doto px-4" >{"@" + username}</div>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}