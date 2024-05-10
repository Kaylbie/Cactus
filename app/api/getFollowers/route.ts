import { NextApiRequest, NextApiResponse } from 'next';
import { getFollowers } from '@/lib/follow-service';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const followers = await getFollowers();
    //console.log(followers)
    return NextResponse.json({ followers });
}