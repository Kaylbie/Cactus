"use client";
import {Participant, Track} from "livekit-client";
import { useRef, useState ,useEffect} from "react";
import{useTracks} from "@livekit/components-react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";
import { LiveBadge } from "../live-badge";

interface LiveVideoProps{
    participant:Participant;
};

export const LiveVideo=({participant}:LiveVideoProps)=>{
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef=useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen]=useState(false);
    

    
    
    

    const toggleFullscreen=()=>{
        if(isFullscreen){
            document.exitFullscreen();
        }
        else if(wrapperRef.current){
            wrapperRef.current.requestFullscreen();
        }
    }
    const handleFullscreenChange=()=>{
        const isCurrentlyFullscreen=document.fullscreenElement!==null;
        setIsFullscreen(isCurrentlyFullscreen);
    }

    useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

    useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track)=>track.participant.identity===participant.identity)
    .forEach((track)=>{
        if(videoRef.current){
            track.publication.track?.attach(videoRef.current);
        }

    });
    return(
        <div
            ref={wrapperRef}
            className="relative h-full flex"
        >
            <video 
            ref={videoRef}
            width="100%" />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <LiveBadge className="absolute top-0 right-0 m-4 z-10"/>
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    {/* {TODO: PAUSE BUTTON} */}
                    {/* {TODO: QUALITY ? } */}
                    {/* {TODO: FIX VOLUME CONTROL ? } */}
                    <VolumeControl
                        onChange={()=>{}}
                        onToggle={()=>{}}
                        value={0}
                    />
                    <FullscreenControl 
                        isFullscreen={isFullscreen}
                        onToggle={toggleFullscreen}
                    />

                </div>
            </div>
            
            
        </div>
    )
}