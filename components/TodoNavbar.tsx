"use client";
import {useSearchParams} from "next/navigation";

import Link from "next/link";
import {useEffect, useState} from "react";
import {set} from "zod";

const TodoNavbar = () => {
    const searchParams = useSearchParams();
    const [activeButton, setActiveButton] = useState("all");
    const todoFilter = searchParams.get("todos");
    useEffect(() => {

        const storedActiveButton = localStorage.getItem("activeButton");
        if (storedActiveButton) {
            setActiveButton(storedActiveButton);
        }
    }, []);

    useEffect(() => {

        localStorage.setItem("activeButton", activeButton);
    }, [activeButton]);

    return (

        <nav className="mt-3 mb-3 flex items-center justify-center gap-40 w-[150px]">
            <Link href="/"  className={activeButton === "all" ? "activeButton" : ""} onClick={()=>setActiveButton("all")}>All</Link>
            <Link href="/?todos=active" className={activeButton ==="active" ? "activeButton" : ""} onClick={()=>setActiveButton("active")}>Active</Link>
            <Link href="/?todos=completed" className={activeButton ==="completed" ? "activeButton" : ""} onClick={()=>setActiveButton("completed")}>Completed</Link>
            <style>
                {`
                .activeButton {
                    background-color: #007bff;
                    color: white;
                    padding : 5px 20px 5px 20px;
                    border: 2px solid ;
                    border-radius: 5px;
                    font-weight : bold;
                `}
            </style>
        </nav>

    )
}
export default TodoNavbar;