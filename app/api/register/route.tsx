import {db} from "@/lib/prisma";
import {hash} from "bcrypt";
import {NextResponse} from "next/server";

export async function POST(req:Request,res:Response){
    const {name , email , password} = await req.json();
    const exist = await db.user.findFirst({
        where :{
            email
        },
    });
    if(exist){
        throw new Error("User already exists");
    }
    const user = await db.user.create({
        data :{
            name,
            email,
            password:await hash(password,10)
        }
    })
    return NextResponse.json({message : "You are Successfully Register"})
}