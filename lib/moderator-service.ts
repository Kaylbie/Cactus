import { db } from "./db";
import { getSelf } from "./auth-service";
import { getUserIdByUsername } from "@/actions/users";

export const addModerator = async (moderatorName: string, moderatedName: string) => {
      const self = await getSelf();
      const moderatorUserId = await getUserIdByUsername(moderatorName);
      const moderatedUserId = await getUserIdByUsername(moderatedName);
      
      const existingModerator = await db.moderator.findFirst({
        where: {
          moderatorId: moderatorUserId,
          moderatedId: moderatedUserId,
        },
      });

      if (existingModerator) {
        throw new Error("This use r is already modded");
      }

      const moderator = await db.moderator.create({
        data: {
          moderator: {
            connect: {
              id: moderatorUserId,
            },
          },
          moderated: {
            connect: {
              id: moderatedUserId,
            },
          },
        },
      });

      return moderator;
};
  
export const removeModerator = async (moderatorName: string, moderatedName: string) => {
  const self = await getSelf();

  const moderatorUserId = await getUserIdByUsername(moderatorName);
  const moderatedUserId = await getUserIdByUsername(moderatedName);

  const existingModerator = await db.moderator.findFirst({
    where: {
      moderatorId: moderatorUserId,
      moderatedId: moderatedUserId,
    },
  });

  if (!existingModerator) {
    throw new Error("This user is not modded");
  }

  const moderator = await db.moderator.delete({
    where: {
      id: existingModerator.id,
    },
  });

  return moderator;
};

export const isModerator = async (hostId: string) => {
  try {
      const moderatorUserId=await getSelf();
      //const moderatorUserId = await getUserIdByUsername(moderatorName);
      //const moderatedUserId = await getUserIdByUsername(moderatedName);
      //console.log(hostId);
      const existingModerator = await db.moderator.findFirst({
          where: {
              moderatorId: moderatorUserId.id,
              moderatedId: hostId,
          },
      });

      return !!existingModerator;
  } catch {
      return false;
  }
};