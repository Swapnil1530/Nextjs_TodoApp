import {getServerSession} from "next-auth";
import {db} from "@/lib/prisma";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const getTodoList = async() => {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const res = await db.todotask.findMany({
            where :{
                userId : userId,
            }
    });

    if(!res) return null;
    return res;
}