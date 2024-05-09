"use client";

import { useViewerToken } from "@/hooks/user-viewer-token";
import { Stream, User } from "@prisma/client";
import {LiveKitRoom} from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Skeleton } from "../ui/skeleton";
import { Header } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";



interface StreamPlayerProps{
    user:User&{
        stream:Stream|null,
        _count:{followedBy:number}
    };
    stream:Stream;
    isFollowing:boolean;
    isModded:boolean;
}

export const StreamPlayer = ({user, stream, isFollowing,isModded}:StreamPlayerProps)=>{

    const {collapsed}=useChatSidebar((state)=>state);


    const {
        token,name,identity
    }=useViewerToken(user.id);
    
    //console.log({token,name,identity});
    if(!token||!name||!identity){
        return(
            <StreamPlayerSkeleton/>
        )
    }
    
    //console.log({name});
    return(
        <>
            {collapsed&&(
                <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                    <ChatToggle/>
                </div>
            )}
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={
                    cn(
                        "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                        collapsed&&"lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"  
                    )}
            >
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video
                        hostName={user.username}
                        hostIdentity={user.id}
                        thumbnailUrl={stream.thumbnailUrl||""}
                    />
                    <Header
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        imageUrl={user.imageUrl}
                        isFollowing={isFollowing}
                        name={stream.name}
                    />
                    <InfoCard
                        name={stream.name}
                        thumbnailUrl={stream.thumbnailUrl||""}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        isModded={isModded}
                    />
                    <AboutCard
                        hostName={user.username}
                        hostBio={user.bio||""}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        followedByCount={user._count.followedBy}                 
                    />

                </div>
                <div className={cn(
                    "col-span-1",
                    collapsed&&"hidden"
                )}>
                    <Chat
                        viewerName={name}
                        hostName={user.username}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        isChatEnabled={stream.isChatEnabled}
                        isChatDelayed={stream.isChatDelayed}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                        isModded={isModded}
                    />

                </div>
            </LiveKitRoom>
        </>
    );
};

export const StreamPlayerSkeleton = ()=>{
    return(
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                
            </div>
            <div className="col-span-1 bg-background">
                <ChatSkeleton />
            </div>
        </div>
    )
}