"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { startTransition, useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps{
    hostIdentity:string;
    isFollowing:boolean;
    isHost:boolean;
}

export const Actions = ({hostIdentity,isFollowing,isHost}:ActionsProps)=>{

    const [isPending,startTransition]=useTransition();
    const router = useRouter();

    const handleFollow=()=>{
        startTransition(()=>{
            onFollow(hostIdentity)
                .then((data)=>toast.success(`Following ${data.following.username}`))
                .catch((err)=>toast.error("Something went wrong"));
        })
    };

    const handleUnfollow=()=>{
        startTransition(()=>{
            onUnfollow(hostIdentity)
                .then((data)=>toast.success(`Unfollowing ${data.following.username}`))
                .catch((err)=>toast.error("Something went wrong"));
        })
    };


    const {userId}=useAuth();
    const toggleFollow=()=>{
        if(!userId){
            return router.push("/sign-in");
        }
        if(isHost) return;
        if(isFollowing){
            handleUnfollow();
        }else{
            handleFollow();
        }
    }

    return(
        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <Button
            disabled={isPending||isHost}
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
            >
            <Heart
                className={cn(
                    "h-4 w-4 mr-2",
                    isFollowing? "fill-white" : "fill-none"
                )} />
                {isFollowing?"Following":"Follow"}
            </Button>

            <Button
                disabled={true}
                onClick={()=>{}}
                variant="secondary"
                size="sm"
                className="w-full lg:w-auto bg-green-500"
            >
                <Star
                    className={cn(
                    "h-4 w-4 mr-2",
                    false ? "fill-white" : "fill-none"
                )}
                />
                {false ? "Subscribed" : "Subscribe"}
            </Button>
        </div>
        
        
    )
}