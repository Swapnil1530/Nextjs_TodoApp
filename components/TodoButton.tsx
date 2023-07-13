"use client"
import {db} from "@/lib/prisma";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {useState} from "react";

const TodoButton = ({id,completed}:any) => {
    const router = useRouter();
    const [isChecked , setIsChecked] = useState(completed);
    const updateHandler = async (id:any) => {
        try {
           const res = await fetch(`/api/Task/${id}`,{
               method:'PUT',
           });
           const data = await res.json();
           if(!res.ok) return toast.error(data.message);
           router.refresh();
           toast.success(data.message);
        }catch (e) {
            
        }
    }
    const deleteHandler = async(id:any)=>{
        try{
          const res = await fetch(`/api/Task/${id}`,{
              method:"DELETE",
          });
          const data = await res.json();
          if(res.ok){
              router.refresh();
              toast.success(data.message);
          }
        }catch (e:any) {
            throw new Error(e)
        }
    }
    return(
       <div className="flex items-center gap-2">
           <input
               className="w-5 h-5"
               type="checkbox"
               checked={completed}
               onChange={() => updateHandler(id)}
           />
           <button
               onClick={() => deleteHandler(id)}
               className="px-1 rounded-sm hover:bg-red-700 transition bg-red-600"
           >
               Delete
           </button>
       </div>
    );
}
export default TodoButton;