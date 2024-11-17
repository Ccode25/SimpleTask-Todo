import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTodo from "./EditTodo";

function ListTodos({ todos, setTodos }) {
  const [header, setHeader] = useState("Loading...");

  // Fetch todos from the server
  async function getTodos() {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);

      // Update the header based on the availability of tasks
      if (response.data.length > 0) {
        setHeader("Your Task List");
      } else {
        setHeader("No Tasks Available");
      }
    } catch (error) {
      console.error(error.message);
      setHeader("Failed to load tasks");
    }
  }

  // Delete a todo and update the header dynamically
  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.todo_id !== id);
      setTodos(updatedTodos);

      // Dynamically update the header based on the remaining todos
      if (updatedTodos.length === 0) {
        setHeader("No Tasks Available");
      } else {
        setHeader("Your Task List");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  // Update a todo in the list after editing
  function updateTodo(updatedTodo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
      )
    );
  }

  useEffect(() => {
    getTodos(); // Fetch todos only when the component mounts
  }, []); // Only run on component mount

  return (
    <section className="mx-auto p-5 max-w-full sm:max-w-[540px]">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {header}
      </h2>

      <div className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg shadow-md">
          {todos.map((todo) => (
            <div
              key={todo.todo_id}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <p className="text-gray-700 text-lg font-medium mb-3 break-words">
                {todo.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                <EditTodo
                  todo={todo}
                  todo_id={todo.todo_id}
                  onEdit={updateTodo}
                />

                <button
                  onClick={() => handleDelete(todo.todo_id)}
                  className="bg-red-500 text-white text-sm px-3 py-1 w-full sm:w-24 rounded-md shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ListTodos;
