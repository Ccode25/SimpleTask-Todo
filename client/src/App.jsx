import React, { useState } from "react";
import axios from "axios";

// components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  const [todos, setTodos] = useState([]); // Track todos in state
  const [description, setDescription] = useState(""); // Track description

  // Handle form submission for adding new todo
  async function onSubmitForm(event, description) {
    event.preventDefault();

    if (description.trim() === "") {
      console.log("Description cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/todos", {
        description: description,
      });

      setTodos([...todos, response.data]); // Add the new todo to the list
      setDescription(""); // Clear input after adding
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Todo App</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <InputTodo
          onSubmit={onSubmitForm}
          description={description}
          setDescription={setDescription}
        />
        <ListTodos todos={todos} setTodos={setTodos} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <p className="text-center">
          Made with ❤️ by Your Aeron {new Date().getFullYear()} All rights
          reserved
        </p>
      </footer>
    </div>
  );
}

export default App;
