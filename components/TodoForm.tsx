"use client"
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useState} from "react";


const TodoForm = () => {
    const router = useRouter();
    const [showForm , setShowForm] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const res = await fetch("/api/Task",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                title:e.currentTarget.title.value,
                desc:e.currentTarget.desc.value,
            })
        })
        if(res.ok){
            router.refresh();
            toast.success("data submitted");
            setShowForm(false);
        }
        else{
            const {error} = await res.json();
            toast.error(error);
        }
    }
    return(
        <>

            {!showForm && (
                <button onClick={()=>setShowForm(true)}
                   className=" bg-blue-500 text-white  px-4 py-2 rounded-md hover:bg-blue-700 transition  mb-2">
                    Add Todo
                </button>
            )}

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="prnNumber"
                            className="block text-xs text-white uppercase"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder=""
                            required
                            className="mt-1 block w-full bg-transparent rounded-md border  px-3 py-2  shadow-sm focus:border-white  focus:ring-white sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs text-white uppercase"
                        >
                            Desc
                        </label>
                        <input
                            id="desc"
                            name="desc"
                            type="text"
                            required
                            className="mt-1 block w-full appearance-none rounded-md border border-white px-3 py-2 bg-transparent shadow-sm focus:border-white  focus:ring-white sm:text-sm"
                        />
                    </div>
                    <div className="flex items-center justify-center mt-2 mb-2">
                        <button className="bg-blue-500 text-white  px-4 py-2 rounded-md hover:bg-blue-700 transition" type="submit">Submit</button>
                    </div>
                </form>
            )}

            </>
    )
}
export default TodoForm;