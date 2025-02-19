"use client";

import {toast} from "sonner";
import {useTransition} from "react";
import {updateStream} from "@/actions/stream";

import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes="isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";


interface ToggleCardProps {
    label: string;
    value: boolean;
    field: FieldTypes;
    hostIdentity: string;
}


export const ToggleCard = ({
    label,
    value=false,
    field,
    hostIdentity,
}:ToggleCardProps)=>{
    const [isPending,startTransition] = useTransition();
    const onChange = ()=>{
        startTransition(()=>{
            updateStream(hostIdentity,{[field]:!value})
            .then(()=>toast.success("Chat settings updated"))
            .catch(()=>toast.error("Error updating chat settings"));
        });
    }
    return(
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">
                    {label}
                </p>
                <div className="space-y-2">
                    <Switch
                        disabled={isPending}
                        onCheckedChange={onChange}
                        checked={value}
                    >
                        {value?"On":"Off"}
                    </Switch>

                </div>
            </div>
        </div>
    );
};

export const ToggleCardSkeleton = ()=>{
    return(
        <Skeleton className="rounded-xl p-10 w-full" />
    );
};