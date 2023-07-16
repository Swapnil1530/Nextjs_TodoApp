"use client"
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useState} from "react";


const TodoForm = () => {
    const router = useRouter();
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const res = await fetch("/api/Task",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                title:e.currentTarget.title.value,

            })
        })
        if(res.ok){
            router.refresh();
            toast.success("data submitted");

        }
        else{
            const {error} = await res.json();
            toast.error(error);
        }
    }


    return(
        <>

            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    className="text-black font-semibold w-[430px] p-2 border-2 border-gray-800 rounded"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Write Todo"
                    required
                />

                <button className="font-bold cursor-pointer p-2 bg-gray-900 border-2 rounded text-white" type="submit">Submit</button>
            </form>
        </>
    )
}
export default TodoForm;