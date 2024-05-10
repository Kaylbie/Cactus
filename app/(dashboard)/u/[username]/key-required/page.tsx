"use client"
import { useEffect, useState } from "react";
import { KeyRequiredModal } from "./key-required-modal";
import { NormalPage } from "./normal-page";
import { cn } from "@/lib/utils";





const KeyRequiredPage = () => {
    const [keyIsCorrect, setKeyIsCorrect] = useState(false);
    const [keyEntered, setKeyEntered] = useState(false);
    const [key, setKey] = useState('');


    useEffect(() => {
        const checkKey = async () => {
            try {
                const response = await fetch('/api/check-key', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ key }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                setKeyIsCorrect(data.isCorrect);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        checkKey();
    }, [key]);

    
    return (
        
        <div className={cn(
            !keyIsCorrect&&"flex flex-col gap-y-4 h-full items-center justify-center space-y-6",
        )}>
            
            {keyIsCorrect ? (
                <NormalPage />
            ) : (
                <div >
                    <KeyRequiredModal setKey={setKey}/>
                </div>
            )}
        </div>
    );
}
 
export default KeyRequiredPage;