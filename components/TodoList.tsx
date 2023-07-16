"use client";
import TodoButton from "@/components/TodoButton";
import TodoForm from "@/components/TodoForm";
import {useSearchParams} from "next/navigation";
import React from "react";

type  Todos = {
    id:string,
    title:string,
    completed : boolean,
    isCompleted : boolean,
}
type TodoList = {
    data : Todos[]
}
const TodoList = ({data}:TodoList)=> {
    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos');
    let filteredTodos = data;
    if(todosFilter === 'active'){
        filteredTodos = data.filter((todo:any) => !todo.isCompleted);
    }else if(todosFilter === 'completed'){
        filteredTodos = data.filter((todo:any)=>todo.isCompleted);
    }
    return (
       <>
           <div className="flex flex-col w-[550px]">

           {filteredTodos.length > 0 ?(filteredTodos.map((todo:Todos)=>{
               return (
               <div key={todo.id} className="flex bg-gray-900 p-4 border-4 m-2 border-blue-800">

                   <label>{todo.title}</label>

                   <div className="flex justify-end items-end w-5/6">
                   <TodoButton id={todo.id} completed={todo.isCompleted}/>
                   </div>
               </div>
               )
           })):(
               <div className=" p-4 border-4 m-2 border-b-blue-800">
               No Todo for this section
               </div>
           )}


           </div>
       </>
    )
}


export default TodoList;