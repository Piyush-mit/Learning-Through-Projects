import { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { findUserInfo, getProjects } from "@/actions/user.actions";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { StateType } from "@/redux/store";
import { changeAuth, updateUser } from "@/redux/slices/themeSlice";


function Listprojects() {
    const navigate = useNavigate();
    const projects = useSelector((state: StateType) => state.themeSlice.user.codes);
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            findUserInfo().then((response) => {
                if (response.status === 200) {
                    dispatch(changeAuth(true));
                    const username = response.data.username;
                    const email = response.data.email;
                    const codes = response.data.codes;
                    if (!response.data) return toast.error("Error fetching user")
                    dispatch(updateUser({ username, email, codes }));
                }
            })
        }catch(error){}
    }, [])
    return (
        <ScrollArea className="h-full rounded-md inline-block w-full p-2 pt-4 border">
            <div className="flex-col">
                <h4 className="mb-2 pl-4 text-md leading-none font-medium">Your Projects</h4>
                {projects.map((project: any) => (
                    <div className="flex w-full items-center justify-between text-sm">
                        <Button variant="ghost" onClick={() => navigate(`/compiler/${project._id}`, { replace: true })} className="w-full justify-start" >{project.title}</Button>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

export default Listprojects