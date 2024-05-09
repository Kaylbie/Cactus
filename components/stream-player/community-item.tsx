"use client";

import { cn, stringToColor } from "@/lib/utils";
import { Button } from "../ui/button";
import { Hint } from "../hint";
import { Crown, MinusCircle } from "lucide-react";
import { startTransition, useTransition } from "react";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";
import { onMod } from "@/actions/moderator";
import { isModerator } from "@/lib/moderator-service";
import { getUserByUsername } from "@/lib/user-service";
import { getUserIdByUsername } from "@/actions/users";


interface CommunityItemProps{
    hostName:string;
    viewerName:string;
    participantName?:string;
    participantIdentity:string;
    isModded:boolean;
};

export const CommunityItem = ({hostName,viewerName,participantName,participantIdentity,isModded}:CommunityItemProps)=>{
    const [isPending,setTransition]=useTransition();
    const color=stringToColor(participantName||"");
    const isSelf=participantName?.split('|')[0]===viewerName;
    const isHost=viewerName===hostName;
    const isParticipantHost=participantName===hostName;
    //const hostIdentity=getUserByUsername(hostName);
    //const isModded=onCheckMod(streamId,participantIdentity);
    //const isModerator=onCheckMod(streamId,participantIdentity);
    //console.log(isModerator);
    //console.log(participantIdentity);
    //const label=isModded?"Unmod user":"Mod user";
    
    
    const handleBlock=()=>{
        
        if(!participantName||isSelf||(!isHost&&!isModded)){
            console.log(participantName, isSelf, !isHost);
            return;
        }
    
        startTransition(()=>{
            
            onBlock(participantIdentity,hostName)
                .then(()=> toast.success(`Blocked ${participantName}`.split('|')[0]))
                .catch((err)=>toast.error(err.message));
        })
    }
    const handleMod=()=>{
        if(!participantName||isSelf||!isHost){
            return;
        }
        startTransition(()=>{
            onMod(participantName.split('|')[0], hostName)
                .then(()=> toast.success(`Modded ${participantName}`.split('|')[0]))
                .catch((err)=>toast.error(err.message));
        })
    }
    return(
        <div className={cn(
            "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
            isPending&&( "opacity-50 ponter-events-none")
        )}>
            <p style={{color:color}}>
                {participantName?.split('|')[0]}
            </p>
            <div className="flex flex-row">
                <div>
                    {isHost &&!isSelf&&(
                        /*TODO: FIX PERMISSIONS*/
                        <Hint label={"MOD"} asChild>
                            <Button
                                variant="ghost"
                                disabled={isPending}
                                onClick={handleMod}
                                className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
                            >
                                <Crown className="h-4 w-4 text-muted-foreground"/>
                            </Button>
                        </Hint>
                    )}
                    {(isHost||isModded)&&!isSelf&&!isParticipantHost&&(
                        <Hint label="Block" asChild>
                            <Button 
                                variant="ghost"
                                disabled={isPending}
                                onClick={handleBlock}
                                className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
                            >
                                <MinusCircle className="h-4 w-4 text-muted-foreground"/>
                            </Button>
                        </Hint>
                    )}
                </div>
            </div> 
        </div>
    )
}