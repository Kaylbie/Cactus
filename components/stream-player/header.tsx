"use client";

import { useConnectionState, useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserAvatar } from "../user-avatar";
import { UserIcon } from "lucide-react";
import { Actions } from "./actions";

interface HeaderProps {
    imageUrl: string;
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    isFollowing: boolean;
    name: string;
}

export const Header = ({ hostName, hostIdentity, viewerIdentity, imageUrl, isFollowing, name }:HeaderProps) => {
    const participants=useParticipants();
    const participant=useRemoteParticipant(hostIdentity);
    const isLive=!!participant;
    const participantCount=participants.length-1;
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity.replace('host-', '') === hostIdentity;

    return(
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar
                    imageUrl={imageUrl}
                    username={hostName}
                    size="lg"
                    isLive={isLive}
                    showBadge={true}
                />
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-xl font-semibold text-white/90">
                            {hostName}
                        </h2>
                    </div>
                    <p className="text-sm font-semibold">
                        {name}
                    </p>
                    {isLive?(
                        <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                            <UserIcon className="h-4 w-4"/>
                            <p>
                                {participantCount} {participantCount===1?"viewer":"viewers"}
                            </p>
                        </div>
                    ):(
                        <p className="font-semibold text-xs text-muted-foreground">
                            Offline
                        </p>
                    )}
                </div>  
            </div>
                <Actions
                    isFollowing={isFollowing}
                    isHost={isHost}
                    hostIdentity={hostIdentity}
                />
        </div>
    )
}