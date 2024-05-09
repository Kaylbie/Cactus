"use client";

import {format} from "date-fns";
import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { Crown } from "lucide-react";

interface ChatMessageProps{
    data:ReceivedChatMessage;
    hostName:string;
    isModded:boolean;
}

export const ChatMessage=({data, hostName, isModded}:ChatMessageProps)=>{
    const color=stringToColor(data.from?.name||"");

    let Icon;
    

    return(
        <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
            <p className="text-sm text-white/40">
                {format(data.timestamp, "HH:MM")}
            </p>
            <div className="flex flex-wrap items-baseline gap-1 grow">
            
                <Crown className="w-3 h-3"/>
              
                <p className="text-sm font-semibold whitespace-nowrap">
                    <span className="truncate" style={{color:color}}>
                        {data.from?.name?.split('|')[0]}
                    </span>:  
                </p>
                <p className="text-sm break-all">
                    {data.message}
                </p>
            </div>
        </div>
    );
};