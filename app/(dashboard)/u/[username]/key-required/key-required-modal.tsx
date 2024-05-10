import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface KeyRequiredModalProps {
    setKey: (key: string) => void;
}

export const KeyRequiredModal: React.FC<KeyRequiredModalProps> = ({ setKey }) => {
    const [inputKey, setInputKey] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputKey(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsPending(true);
        setKey(inputKey);
        setIsPending(false);
    }

    return (
        <Dialog>
            <DialogTrigger>
                Enter
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Enter your key
                    </DialogTitle>
                </DialogHeader>
                <form 
                    onSubmit={handleSubmit}
                    className="space-y-14"
                >
                    <div className="space-y-2">
                        <label>
                            Key
                        </label>
                        <Input
                            placeholder="Enter key"
                            onChange={handleInputChange}
                            value={inputKey}
                            disabled={isPending}
                        />   
                    </div>
                    <div className="flex justify-between">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="primary"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}