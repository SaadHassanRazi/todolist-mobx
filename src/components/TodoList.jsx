import React, { useEffect, useState } from "react";
import todoStore from "../store/todoStore";
import { observer } from "mobx-react-lite";

const TodoList = () => {
  const [editTodo, setEditTodo] = useState("");
  const [todoEditStatus, setTodoEditStatus] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("todo"); // New state

  const removeTodoHandler = (id) => {
    todoStore.removeTodo(id);
  };

  const toggleTodoStatusHandler = (id) => {
    todoStore.changeStatus(id);
  };

  const newTodoData = {
    id: currentEditId,
    todo: editTodo,
    completed: todoEditStatus,
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();
    todoStore.editTodo(newTodoData);
  };
  useEffect(() => {
    if (todoStore.todos.length === 0) {
      todoStore.showTodos();
    }
  }, []);

  return (
    <div className="text-center">
      <h1>TodoList</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="search" className="form-label">
            Search
          </label>
          <input
            type="text"
            placeholder="Enter Your Filter"
            className="form-control"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="filterType" className="form-label">
            Select Filter Type
          </label>
          <select
            id="filterType"
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
      </form>
      <table className="table table-striped table-primary">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>UserId</th>
            <th>Remove Todo</th>
            <th>Change Status</th>
            <th>Priority Level</th>
          </tr>
        </thead>
        <tbody>
          {todoStore.todos
            .filter((item) => {
              if (search.toLowerCase() === "") return true;

              if (filterType === "todo") {
                return item.todo.toLowerCase().includes(search.toLowerCase());
              } else if (filterType === "priority") {
                return item.priority
                  .toLowerCase()
                  .includes(search.toLowerCase());
              } else if (filterType === "status") {
                const status = item.completed ? "completed" : "pending";
                return status.includes(search.toLowerCase());
              }
              return false;
            })
            .map((item, index) => (
              <tr key={item.id}>
                <th>{index}</th>
                <td className={item.completed ? "text-danger" : "text-dark"}>
                  {item.todo}
                </td>
                <td>{item.userId}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTodoHandler(item.id)}
                  >
                    Remove
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => toggleTodoStatusHandler(item.id)}
                  >
                    Change Status
                  </button>
                </td>
                <td>{item.priority}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default observer(TodoList);
