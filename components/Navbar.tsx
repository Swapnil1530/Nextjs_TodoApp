"use client"
import Link from "next/link";
import {useSelectedLayoutSegment} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {signout} from "next-auth/core/routes";

const linkData:any = [
    {
        lable: "Home",
        path: "/",
        targetSegment: null,
    },
    {
        lable: "Profile",
        path: "/profile",
        targetSegment: "profile",
    },
]
const Navbar = () => {
   const {data :session} = useSession();
   const user = session?.user;
    const activeSegment = useSelectedLayoutSegment();
    return (
        <div className="bg-gray-900 text-white font-semibold flex justify-between  m-auto top-5 px-10 py-4 rounded shadow-md">
            <h1 className="">Todo</h1>
            <div className="space-x-10">
                {linkData.map((link:any, index:any) => {
                    return (
                        <Link
                            key={index}
                            href={link.path}
                            className={`${
                                activeSegment === link.targetSegment ? " border-2 rounded  p-2.5  -white bg-blue-950" : ""
                            }`}
                        >
                            {link.lable}
                        </Link>
                    );
                })}
                {user && user  ? (
                    <button onClick={()=>signOut()}>Logout</button>
                ) : (
                    <Link href={"/login"}>Login</Link>
                )}
            </div>
        </div>

    )
}
export default Navbar;