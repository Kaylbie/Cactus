"use client";


  
import { Separator } from "@radix-ui/react-select";
import { Pencil, Image } from "lucide-react";
import { useState } from "react";
import { InfoModal } from "./info-modal";


interface InfoCardProps{
    name:string;
    thumbnailUrl:string;
    hostIdentity:string;
    viewerIdentity:string;
    isModded:boolean;
}


export const InfoCard = ({name, thumbnailUrl, hostIdentity, viewerIdentity,isModded}:InfoCardProps)=>{
    const hostAsViewer=`host-${hostIdentity}`;
    const isHost=viewerIdentity===hostAsViewer;
    
    
    if(!isHost&&!isModded){return null}

    return(
        <div className="px-4">
            <div className="rounded-xl bg-background">
                
                <InfoModal
                    initialName={name}
                    initialThumbnailUrl={thumbnailUrl}
                    hostIdentity={hostIdentity}
                />
                <Separator/>
                <div className="p-4 lg:p-6 space-y-4">
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Name
                        </h3>
                        <p>
                            {name}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Thumbnail
                        </h3>
                        {thumbnailUrl?(
                            <img src={thumbnailUrl} alt ={name} className="w-32 h-32 object-cover rounded-md"/>
                        ):(
                            <Image />
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    )
}