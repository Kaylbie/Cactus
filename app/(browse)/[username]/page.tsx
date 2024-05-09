import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { notFound } from "next/navigation";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { isModerator } from "@/lib/moderator-service";

interface UserPageProps {
    params:{
        username:string;
    };
};

const UserPage = async ({
    params
}:UserPageProps) =>{
    const user = await getUserByUsername(params.username);
    if(!user||!user.stream){
        notFound();
    }
    const isFollowing = await isFollowingUser(user.id);
    const isModded = await isModerator(user.id);
    const isBlocked = await isBlockedByUser(user.id);
    //console.log(isModded);
    if(isBlocked){
        notFound();
    }
    return (
        <>
            <StreamPlayer 
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
            isModded={isModded}
            />
        </>
    );
};

export default UserPage;

