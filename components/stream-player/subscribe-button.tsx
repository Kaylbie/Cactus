import { Star } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  
export const SubscribeButton=()=>{
    return(
    <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
        <Drawer>
            <DrawerTrigger>
                <Button
                    disabled={false}
                    onClick={()=>{}}
                    variant="secondary"
                    size="sm"
                    className="w-full lg:w-auto bg-green-500"
                >
                    <Star
                        className={cn(
                        "h-4 w-4 mr-2",
                        false ? "fill-white" : "fill-none"
                        )}
                    />
                    {false ? "Subscribed" : "Subscribe"}
                </Button>

            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle style={{ textAlign: 'center' }}>Are you absolutely sure?</DrawerTitle>
                    
                </DrawerHeader>
                <DrawerFooter>
                    <Button>YES</Button>
                    <DrawerClose>
                        <Button variant="outline">NO</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>
       
    )
}