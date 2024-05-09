"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";

import { Label } from "@radix-ui/react-select";
import { Pencil } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";

interface InfoModalProps{
    initialName:string;
    initialThumbnailUrl:string;
    hostIdentity:string;
}

export const InfoModal = ({initialName, initialThumbnailUrl,hostIdentity}:InfoModalProps)=>{
    const [isPending, startTransition] = useTransition();
    const [name, setName]=useState(initialName);
    const [thumbnailUrl, setThumbnailUrl]=useState(initialThumbnailUrl);

    const onChangeName = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }

    const onChangeThumbnailUrl = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setThumbnailUrl(e.target.value);
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        startTransition(()=> {
            updateStream(hostIdentity,{name:name, thumbnailUrl:thumbnailUrl})
                .then(()=>toast.success("Stream info updated"))
                .catch(()=>toast.error("Something went wrong"))
        });
    };



    return(
        <Dialog>
            <DialogTrigger>
                <div className="flex items-center gap-x-2.5 p-4">
                    <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
                        <Pencil className="h-5 w-5"/>
                    </div>
                    <div>
                        <h2 className="text-sm lg:text-lg font-semibols">
                            Edit stream info
                        </h2>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit stream info
                    </DialogTitle>
                </DialogHeader>
                <form 
                    onSubmit={onSubmit}
                    className="space-y-14"
                >
                    <div className="space-y-2">
                        <label>
                            Name
                        </label>
                        <Input
                            placeholder="Stream name"
                            onChange={onChangeName}
                            value={name}
                            disabled={isPending}
                        />   
                    </div>
                    <div className="space-y-2">
                        <label>
                            Thumbnail URL
                        </label>
                        <Input
                            placeholder="Stream name"
                            onChange={onChangeThumbnailUrl}
                            value={thumbnailUrl}
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