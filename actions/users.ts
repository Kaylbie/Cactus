"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { getUserByUsername } from "@/lib/user-service";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (values:Partial<User>)=>{
    const self=await getSelf();
    const validData={
        bio:values.bio,
    };

    const user =await db.user.update({
        where:{
            id:self.id
        },
        data:{...validData}
    });
    revalidatePath(`/u/${user.username}`);
    revalidatePath(`/${user.username}`);
    return user;
};


export const getUserIdByUsername = async (username:string)=>{
    const user = await getUserByUsername(username);

    // Check if xists
    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }


    return user.id;
};