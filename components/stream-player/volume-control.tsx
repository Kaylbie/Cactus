"use client";

import {Volume1, Volume2, VolumeX} from "lucide-react";

import {Hint}from "@/components/hint";

import {Slider} from "@/components/ui/slider";

interface VolumeControlProps{
    onToggle:()=>void;
    onChange:(value:number)=>void;
    value:number;
};

export const VolumeControl = ({onToggle, onChange, value}:VolumeControlProps)=>{
    
    

    let Icon=Volume1;
    
    
    return(
        <div className="flex items-center gap-2">
            <Hint label={"Mute"} asChild>
                <button
                    onClick={onToggle}
                    className="text-white hover:bg-white/10 p-1.5 rounded-lg"
                >
                    <Icon className="h-6 w-6"/>
                </button>
            </Hint>
            <Slider
                className="w-[8rem] cursor-pointer"
                
                defaultValue={[33]}
                max={100}
                step={1}
                />
        </div>
    )

}