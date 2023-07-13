import {db} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function DELETE(req:Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const res = await db.todotask.delete({
        where: {
            id,
        }
    });
    return NextResponse.json({message: "Task Deleted SuccessFully"},{status:200});
}
export async function PUT(req:Request,{params}:{params:{id:string}}){
    const id = params.id;
    const Task = await db.todotask.findFirst({
        where:{
            id,
        }
    });
    if(!Task) return null;
    const res = await db.todotask.update({
        where : {
            id,
        },
        data :{
            isCompleted:!Task.isCompleted,
        }
    })
  return NextResponse.json({message:"Todo updated"})

}