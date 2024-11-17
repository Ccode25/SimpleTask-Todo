import React from "react";

function InputTodo({ onSubmit, description, setDescription }) {
  // Handle changes to the input field
  function handleChange(event) {
    setDescription(event.target.value);
  }

  // Regular function for form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent the form from reloading the page
    onSubmit(e, description); // Call onSubmit with both the event and description
  }

  return (
    <div className="mt-10 mx-auto max-w-md">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Add New Task
      </h2>

      {/* Form */}
      <form
        className="flex flex-col sm:flex-row gap-4"
        onSubmit={handleSubmit} // Use the handleSubmit function
      >
        {/* Input Field */}
        <input
          type="text"
          onChange={handleChange}
          value={description}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter a new task..."
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-green-600 focus:ring-2 focus:ring-green-400"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default InputTodo;
