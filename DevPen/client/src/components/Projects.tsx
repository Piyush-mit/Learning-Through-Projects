import { useCallback, useEffect } from "react"
import { ScrollArea } from "./ui/scroll-area"
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { StateType } from "@/redux/store";
import { changeAuth, filterCodes, updateUser, updateUserCodes } from "@/redux/slices/themeSlice";
import { findUserInfo } from "@/actions/user.actions";
import { deleteCode } from "@/actions/compiler.action";
import { Trash2 } from 'lucide-react'
import { Input } from "./ui/input";

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
        } catch (error) { }
    }, [])

    const handleDelete = useCallback((urlId: string) => {
        deleteCode(urlId).then((response) => {
            dispatch(updateUserCodes(response.data.urlId));
            navigate('/compiler');
        })
    }, []);
    return (
        <ScrollArea className="h-full inline-block w-full pt-4 border">
            <div className="flex-col">
                <h4 className=" pl-4 text-md leading-none font-medium border-b pb-4">Your Projects</h4>
                <Input className="focus-visible:border focus-visible:ring-0 rounded" placeholder="Search Projects" onChange={(e)=>dispatch(filterCodes(e.target.value))} ></Input>
                {projects && projects.map((project: any) => (
                    <div className="flex items-center justify-between text-sm p-0 w-62 hover:bg-accent/90" key={project._id}>
                        <span className="mx-2 h-full hover:bg-gray-500/30 rounded"><Trash2 className=" scale-80" onClick={() => handleDelete(project._id)} /></span>
                        <Button variant="ghost" onClick={() => navigate(`/compiler/${project._id}`, { replace: true })} className="w-full  justify-start rounded-none p-0 pr-7" > {project.title} </Button>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

export default Listprojects