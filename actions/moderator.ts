"use server"
import { revalidatePath } from "next/cache";

import { addModerator, isModerator, removeModerator } from "@/lib/moderator-service";

export const onMod = async (userName: string,hostName:string) => {
  try {
    const moderator = await addModerator(userName,hostName);
    revalidatePath("/");

    if (moderator) {
      revalidatePath("/");
    }

    return moderator;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const onUnmod = async (userName: string,hostName:string) => {
    try {
        const moderator = await removeModerator(userName,hostName);
        revalidatePath("/");

        if (moderator) {
            revalidatePath("/");
        }

        return moderator;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const isUserModerator=async (userName:string)=>{
    try {
      const moderator = await isModerator(userName);
      revalidatePath("/");

      if (moderator) {
          revalidatePath("/");
      }

      return moderator;
  } catch (error) {
      throw new Error(`${error}`);
  }
}
