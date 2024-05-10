

import { NextApiRequest, NextApiResponse } from 'next';
import { removeFollower } from '@/lib/follow-service';
import { revalidatePath } from 'next/cache';
import { getSelf } from '@/lib/auth-service';

export async function DELETE(request:Request,{params}:{params:{id:string}}) {
    const self=await getSelf();
    try{
        const removedFollower = await removeFollower(params.id as string);
    }catch{
        return new Response("Failed to remove follower", { status: 500 });
    }
    
    return new Response("Follower removed");
}