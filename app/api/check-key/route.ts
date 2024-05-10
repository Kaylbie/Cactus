import { getSelf } from "@/lib/auth-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const self=await getSelf();
    
    const { key } = await req.json();
    const isCorrect = key === self.username;

    return NextResponse.json({ isCorrect });
}