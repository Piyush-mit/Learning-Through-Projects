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
            <Sidebar className="flex flex-col m-1">
                <SidebarHeader className="px-6 font-doto m-1 border mb-0 rounded">
                    <div className="text-2xl font-medium">{"@" + username}</div>
                </SidebarHeader>
                <SidebarContent className="flex-1 m-1 mb-0">
                    <Listprojects/>
                </SidebarContent>
                <SidebarFooter className="h-12 m-1 rounded border">

                </SidebarFooter>
            </Sidebar>
        </div>
    )
}