import { handleSave } from "@/actions/compiler.action";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { upDateTitle } from "@/redux/slices/compilerSlice";
import type { StateType } from "@/redux/store";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function SaveDialog() {
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const title = useSelector((state: StateType) => state.compilerSlice.title);
    const fullCode = useSelector((state: StateType) => state.compilerSlice.fullCode);
    const dispatch = useDispatch();
    const handleSaveClick = useCallback(() => {
        handleSave(fullCode, navigate, setSaving, title);
    }, [fullCode, navigate, title]);
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">{saving ? 'Saving' : 'Create project'}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Set Title</DialogTitle>
                        <DialogDescription>
                            Enter a title for your project
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Title</Label>
                            <Input id="name-1" name="name" placeholder="DevPen Project" className="focus-visible:border focus-visible:ring-0" onChange={(e) => dispatch(upDateTitle(e.target.value))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleSaveClick}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
