import axios from "axios";
import { flow, onSnapshot, types } from "mobx-state-tree";


const Todo = types.model("Todo", {
  id: types.identifierNumber,
  userId: types.number,
  todo: types.string,
  completed: false,
  priority: types.optional(types.string, "medium"),
  apiResponseId: types.optional(types.number, 0),
});
const TodoStore = types
  .model("Todostore", {
    todos: types.array(Todo),
  })
  .actions((self) => ({
    showTodos: flow(function* () {
      if (self.todos.length > 0) {
        return;
      }
      try {
        const response = yield axios.get("https://dummyjson.com/todos");
        const apiTodos = response.data.todos.map((todo) => ({
          ...todo,
          priority: "medium",
        }));
        const existingIds = self.todos.map((t) => t.id);
        const newTodos = apiTodos.filter(
          (todo) => !existingIds.includes(todo.id)
        );

        self.todos.push(...newTodos);
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    }),

    addTodo: flow(function* (newTodo) {
      try {
        const response = yield axios.post(
          "https://dummyjson.com/todos/add",
          newTodo
        );
        const data = {
          ...response.data,
          id: Date.now() + Math.random(),
          priority: newTodo.priority || "medium",
        };
        const isDuplicate = self.todos.find((item) => item.todo === data.todo);
        if (isDuplicate) {
          alert("Matching Todos Found");
        } else {
          self.todos.unshift(data);
        }
      } catch (error) {
        console.error("Error Posting Data", error);
      }
    }),

    removeTodo(id) {
      self.todos.replace(self.todos.filter((item) => item.id !== id));
    },

    changeStatus(id) {
      const todo = self.todos.find((item) => item.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    editTodo(data) {
      const todo = self.todos.find((item) => item.id === data.id);
      if (todo) {
        todo.todo = data.todo;
        todo.completed = data.completed;
        todo.priority = data.priority || "medium";
      }
    },
  }));

const loadFromLocalStorage = () => {
  const savedState = localStorage.getItem("todoStore");
  return savedState ? JSON.parse(savedState) : { todos: [] };
};

const todoStore = TodoStore.create(loadFromLocalStorage());

onSnapshot(todoStore, (snapshot) => {
  localStorage.setItem("todoStore", JSON.stringify(snapshot));
  console.log("Snapshot saved:", snapshot.todos);
});

export default todoStore;
