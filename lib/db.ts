import {PrismaClient} from '@prisma/client'
declare global{
    var prisma:PrismaClient|undefined
}

export const db=globalThis.prisma||new PrismaClient();

if(process.env.NODE_ENV==='production'){//dont create a new connection if not production
    globalThis.prisma=db; 
}