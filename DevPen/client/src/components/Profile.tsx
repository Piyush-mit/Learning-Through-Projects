import { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import React from "react"
import { Separator } from "@radix-ui/react-select"
import { getProjects } from "@/actions/user.actions";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";


function Listprojects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        try {
            getProjects().then((response) => setProjects(response.data));
        } catch (error) {
            toast.error("Error fetching projects")
        }
    }, []);
    return (
        <ScrollArea className="h-72 rounded-md border inline-block ">
            <div className="p-4 flex-col">
                <h4 className="mb-4 text-sm leading-none font-medium">Projects</h4>
                {projects.map((project: any) => (
                    <React.Fragment key={project.createdAt} >
                        <div className="flex items-center justify-between">
                            <div className="text-sm">{project.title}</div>
                            <Separator className="my-2" />
                            <Button variant="link" onClick={()=>navigate(`/compiler/${project._id}`,{replace:true})}>Open</Button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    )
}

export default Listprojects