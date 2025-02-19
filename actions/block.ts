"use server"
import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";
import { getUserIdByUsername } from "./users";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);


export const onBlock = async (id:string, hostName:string) => {
    //const self=await getSelf();
    const hostId=await getUserIdByUsername(hostName);

    let blockedUser;

    try{
        blockedUser = await blockUser(id);
        
    }catch{
        //guest user
        console.log("guest user");
    }

    try{
        await roomService.removeParticipant(hostId, id);
    }catch{
        //not in room
    }
    revalidatePath("/");
    if(blockedUser){
        revalidatePath(`/${blockedUser.blocked.username}`);
    }
    return blockedUser;
    
};

export const onunBlock = async (id:string) => {
    const unblockedUser = await unblockUser(id);
    revalidatePath("/");
    if(unblockedUser){
        revalidatePath(`/${unblockedUser.blocked.username}`);
    }
    return unblockedUser;

};