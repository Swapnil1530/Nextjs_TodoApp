"use client"
import Link from "next/link";
import {useSelectedLayoutSegment} from "next/navigation";
import {useSession} from "next-auth/react";

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
        <div className="bg-slate-700 text-white flex justify-between fixed w-[60%] left-0 right-0 m-auto top-5 px-10 py-4 rounded shadow-md">
            <h1 className="">Todo</h1>
            <div className="space-x-10">
                {linkData.map((link:any, index:any) => {
                    return (
                        <Link
                            key={index}
                            href={link.path}
                            className={`${
                                activeSegment === link.targetSegment ? "underline" : ""
                            }`}
                        >
                            {link.lable}
                        </Link>
                    );
                })}
                {user && user  ? (
                    <button >Logout</button>
                ) : (
                    <Link href={"/login"}>Login</Link>
                )}
            </div>
        </div>

    )
}
export default Navbar;