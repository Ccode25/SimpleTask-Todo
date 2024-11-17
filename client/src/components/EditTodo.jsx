import React, { useState } from "react";
import axios from "axios";

function EditTodo(props) {
  const [description, setDescription] = useState(props.todo.description);

  function handleChange(event) {
    setDescription(event.target.value);
  }

  async function handleEdit(id) {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`, {
        description: description,
      });
      console.log("Update successful:", response.data);

      // Call onEdit with the updated todo data to update the list in the parent
      props.onEdit({ ...props.todo, description: description });
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  }

  return (
    <div>
      {/* Edit Button */}
      <button
        type="button"
        className="bg-yellow-400 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 w-full sm:w-auto"
        data-bs-toggle="modal"
        data-bs-target={`#id${props.todo_id}`}
      >
        Edit
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id={`id${props.todo_id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editTodoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header bg-gray-100 border-b border-gray-300">
              <h5 className="text-lg font-medium text-gray-700">Edit Task</h5>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              <input
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter new description"
                value={description}
              />
            </div>

            {/* Modal Footer */}
            <div className="modal-footer flex justify-end gap-2 p-4 bg-gray-100 border-t border-gray-300">
              <button
                type="button"
                className="bg-yellow-400 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300"
                onClick={() => handleEdit(props.todo_id)}
                data-bs-dismiss="modal" // This will close the modal after editing
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md shadow-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-200"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
