import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="container">
        <AddTodo />
        
        <TodoList />
      </div>  
    </>
  );
}

export default App;
