"use client"

import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

type TodoButton = {
    id : string,
    completed : boolean,
}

const TodoButton = ({id,completed}:TodoButton) => {
    const router = useRouter();

    const updateHandler = async () => {
        try {
           const res = await fetch(`/api/Task/${id}`,{
               method:'PUT',
           });
           const data = await res.json();
           if(!res.ok) return toast.error(data.message);
           router.refresh();
           toast.success(data.message);
        }catch (e:any) {
            throw new Error(e)
        }
    }
    const deleteHandler = async()=>{
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
               onChange={() => updateHandler()}
           />
           {completed && (
               <button
                   onClick={() => deleteHandler()}
                   className="px-1 rounded-sm hover:bg-red-700 transition bg-red-600"
               >
                   Delete
               </button>
           )}

       </div>
    );
}
export default TodoButton;