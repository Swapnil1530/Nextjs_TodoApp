import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import {db} from "@/lib/prisma";
export async function POST(req:Request,res:Response){
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const {title} = await req.json();

  try {
      const TaskData = await db.todotask.create({
          data:{
              title,
              user : {
                  connect: {
                      id: user.id,
                  },
              }
          }
      })
      return NextResponse.json({TaskData},{status:201} );
  }catch (e:any) {
      throw new Error(e)
  }


}