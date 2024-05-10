import { useEffect, useState } from "react";
import { Follower, columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import {format} from "date-fns";

async function getData(): Promise<Follower[]> {
    const response = await fetch('/api/getFollowers');
    
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data.followers); 
    return data.followers; 
}

export const NormalPage = () => {
    const [data, setData] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const result = await getData();
              const formattedData=result.map((follower:Follower)=>({
                ...follower,
                userId:follower.userId,
                imageUrl:follower.imageUrl,
                username:follower.username,
                createdAt:format(new Date(follower.createdAt),"yyyy/MM/dd"),
              }))
              
              setData(formattedData);
            } catch (error) {
              console.error('Error:', error);
            }
          };

        fetchData();
    }, []);


    // const formattedData=data?.map((follower)=>{
    //     userId:follower.follower.id,
    //     imageUrl:follower.follower.imageUrl,
    //     username:follower.follower.username,
    //     createdAt:follower.createdAt
    // })
    
    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Followers
                </h1>
            </div>
            {data ? <DataTable columns={columns} data={data} /> : 'Loading...'}
        </div>
    );
}