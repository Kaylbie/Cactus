"use client";

import { onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import {useEffect, useState, useTransition} from "react";
import { toast } from "sonner";

interface UnfollowButtonProps{
    userName:string;
};

export const UnfollowButton = ({ userName }: UnfollowButtonProps) => {
    const [isPending, setIsPending] = useState(false);

    const onClick = async () => {
        setIsPending(true);
        try {
            const response = await fetch(`/api/removeFollower/${userName}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast.success(`Follower removed`);
        } catch (error) {
            toast.error(`Failed to remove follower`);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Button
            disabled={isPending}
            onClick={onClick}
            variant="link"
            size="sm"
            className="text-blue-500 w-full"
        >
            Remove
        </Button>
    );
};