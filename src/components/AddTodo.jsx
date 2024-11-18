import React, { useState } from "react";
import todoStore from "../store/todoStore";
import { observer } from "mobx-react-lite";
import { v4 } from "uuid";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoStatus, setTodoStatus] = useState(false);
  const [priority, setPriority] = useState("");
  const newTodoData = {
    id: Date.now() + Math.random(),
    userId: todoStore.todos.length + 1,
    todo: newTodo,
    completed: todoStatus,
    priority: priority,
  };
  const submitHandler = (e) => {
    e.preventDefault();
    todoStore.addTodo(newTodoData);
    console.log(newTodoData);
    setNewTodo("");
  };

  return (
    <div className="container-fluid">
      <div className="row mx-auto">
        <div className="col  mx-auto">
          <form
            className="text-center bg-dark text-white rounded p-5 "
            onSubmit={submitHandler}
          >
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Add Todo
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputTodo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text text-secondary">
                Add Your New Todo
              </div>
            </div>

            <div class="mb-3 form-check">
              <input
                type="checkbox"
                checked={todoStatus}
                onChange={(e) => setTodoStatus(e.target.checked)}
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Status Of Todo
              </label>
            </div>
            <p className="text-center">Priority Level</p>
            <div class="form-check">
              <input
                checked={priority === "high"}
                onChange={(e) => setPriority(e.target.value)}
                value={"high"}
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />

              <label class="form-check-label" for="flexRadioDefault1">
                High
              </label>
            </div>
            <div class="form-check">
              <input
                checked={priority === "medium"}
                onChange={(e) => setPriority(e.target.value)}
                value={"medium"}
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Medium
              </label>
            </div>
            <div class="form-check">
              <input
                checked={priority === "low"}
                onChange={(e) => setPriority(e.target.value)}
                value={"low"}
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Low
              </label>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(AddTodo);
