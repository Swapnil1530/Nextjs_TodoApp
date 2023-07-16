import {getTodoList} from "@/action/getTodoList";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoNavbar from "@/components/TodoNavbar";
const Home = async (e:any) => {
  const TodoListData = await getTodoList();
  if(!TodoListData)return null;
  return (
    <div className="flex flex-col items-center min-h-100vh mt-10">

       <TodoForm />
        <TodoNavbar />
       <div className="space-y-4">
          <TodoList data={TodoListData} />
       </div>
    </div>
  )
}
export default Home;

