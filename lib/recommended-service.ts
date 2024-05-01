import {db} from "@/lib/db";

import {getSelf} from "@/lib/auth-service";

export const getRecommendedService = async()=>{
    const users=await db.user.findMany({
        orderBy:{
            createdAt:"desc"
        },
    });
    return users;
};