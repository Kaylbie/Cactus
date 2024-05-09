"use server";


import {revalidatePath} from "next/cache";
import {db} from "@/lib/db";
import {Stream} from "@prisma/client";

import {getSelf}from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";

export const updateStream = async (hostIdentity:string,values:Partial<Stream>) => {
    try{
        //const self = await getSelf();
        const host=await getUserById(hostIdentity);
        if(!host){
            throw new Error("User not found");
        }
        const selfStream = await db.stream.findUnique({
            where:{
                userId:host.id
            }
        });
        if(!selfStream){
            throw new Error("Stream not found");
        }
        const validData={
            name:values.name,
            thumbnailUrl:values.thumbnailUrl,
            isChatEnabled:values.isChatEnabled,
            isChatDelayed:values.isChatDelayed,
            isChatFollowersOnly:values.isChatFollowersOnly,
        };
        const stream = await db.stream.update({
            where:{
                id:selfStream.id,
            },
            data:{
                ...validData
            }
        });
        revalidatePath(`/u/${host.username}/chat`);
        revalidatePath(`/u/${host.username}`);
        revalidatePath(`/${host.username}`);

        return stream;


    }catch{
        throw new Error("Internal error");
    }

};