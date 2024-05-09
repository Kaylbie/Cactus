"use client";

interface BioModalProps{
    initialBio:string;
}

import { updateUser } from "@/actions/users";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const BioModal = ({initialBio}:BioModalProps)=>{
    const [isPending, startTransition] = useTransition();
    const [bio, setBio]=useState(initialBio);
    const onChangeBio = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setBio(e.target.value);
    }
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        startTransition(()=> {
            updateUser({bio:bio})
                .then(()=>toast.success("Bio info updated"))
                .catch(()=>toast.error("Something went wrong"))
        });
    };




    return(
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button variant="link" size="sm" className="ml-auto">
                        Edit
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit your bio
                    </DialogTitle>
                </DialogHeader>
                <form 
                    onSubmit={onSubmit}
                    className="space-y-14"
                >
                    <div className="space-y-2">
                        <label>
                            Bio
                        </label>
                        <Input
                            placeholder="Your bio"
                            onChange={onChangeBio}
                            value={bio}
                            disabled={isPending}
                        />   
                    </div>
                    <div className="flex justify-between">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="primary"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}