import {db} from "@/lib/prisma";
import {hash} from "bcryptjs";
import {NextResponse} from "next/server";
import Next from "next-auth/src";

export async function POST(req:Request,res:Response){
    const {name , email , password} = await req.json();
    try{
        const exist = await db.user.findFirst({
            where :{
                email
            },
        });
        if(exist){
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        const user = await db.user.create({
            data :{
                name,
                email,
                password:await hash(password,10)
            }
        })
        return NextResponse.json({user});
    }catch (e:any) {
        throw new Error(e.message);
    }


}