
import {getTodoList} from "@/action/getTodoList";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoList";
const Home = async (e:any) => {
  const TodoListData = await getTodoList();
  if(!TodoListData)return null;

  return (
    <div className="flex flex-col items-center justify-center mt-5 ">
       <TodoForm />
       <div className="space-y-4">
           {TodoListData?.map((item)=>{
               return(
                   <TodoItem
                     key={item.id}
                     title={item.title}
                     desc={item.desc}
                     id={item.id}
                     completed={item.isCompleted}
                   />
               )
           })}

       </div>
    </div>
  )
}
export default Home;
