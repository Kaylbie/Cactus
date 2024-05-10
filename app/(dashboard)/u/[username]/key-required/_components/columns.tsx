"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { UnfollowButton } from "./unfollow-button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Follower = {
    id: string;
    userId:string;
    imageUrl:string;
    username: string;
    createdAt: string;
};

export const columns: ColumnDef<Follower>[] = [
    {
        accessorKey: "follower.username",
        header: "Username",
    },
    {
        accessorKey: "createdAt",
        header: "Following since",
        
    },
    {
        id:"actions",
        cell:({row})=><UnfollowButton userName={row.original.username}/>
    }
];