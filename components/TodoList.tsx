import TodoButton from "@/components/TodoButton";
import TodoForm from "@/components/TodoForm";

const TodoList = ({title,desc,id,completed}:any) => {
    return (
        <div className="w-[500px] bg-gray-700 flex justify-between items-center m-auto p-2 rounded-sm ">
            <h3 className="font-bold text-lg">{title}</h3>
            <p>{desc}</p>
            <TodoButton id={id} completed={completed}/>
        </div>
    )
}
export default TodoList;