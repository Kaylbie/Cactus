import { log } from "console";
import{WifiOff} from "lucide-react";

interface OfflineVideoProps{
    username:string;
    thumbnailUrl:string;
};

export const OfflineVideo=({username,thumbnailUrl}:OfflineVideoProps)=>{
    console.log({thumbnailUrl});
    return(
        <div className="h-full flex flex-col space-y-4 justify-center items-center">
            <div 
            className="absolute inset-0" 
            style={{
                backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${thumbnailUrl}}')`,
                backgroundSize:`cover`,
                backgroundPosition:`center`,
                filter:`blur(8px)`
            }}/>
            
            <WifiOff className="h-10 w-10 text-muted-foreground z-10 "/>
            <p className="text-muted-foreground z-10 font-semibold">
                {username} is offline
            </p>
        
            
        </div>
    );
};