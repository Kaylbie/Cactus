import{Loader} from "lucide-react";

interface LoadingVideoProps{
    username:string,
    label:string
};

export const LoadingVideo=({username, label}:LoadingVideoProps)=>{
    let content;
    if(label==="connecting"){
        content="Connecting to ";
    }
    else if(label==="reconnecting"){
        content="Reconnecting to ";
    }else if(label==="disconnected"){
        content="Disconnected from ";
    }
    else{
        content="Loading ";
    }
    return(
        <div className="h-full flex flex-col space-y-4 justify-center items-center">
            <Loader className="h-10 w-10 text-muted-foreground animate-spin"/>
            <p className="text-muted-foreground">
                {content} {username}'s stream
            </p>
        </div>
    );
};