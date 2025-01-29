import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
    setTodos(storedTodos);
  }, []);

  const saveTodos = (todos) => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (todoText.trim() === "") {
      return;
    } else if (todos.includes(todoText)) {
      return;
    } else {
      const newTodos = [...todos, todoText];
      setTodos(newTodos);
      saveTodos(newTodos);
      setTodoText("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(todos[index]);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (editText.trim() === "") {
      return;
    } else {
      const newTodos = [...todos];
      newTodos[editingIndex] = editText;
      setTodos(newTodos);
      saveTodos(newTodos);
      setEditingIndex(null);
      setEditText("");
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#caf0f8] flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mt-12 mb-6">
        ToDo List!
      </h1>

      <div className="w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Qidirish..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <form onSubmit={addTodo} className="mb-6 w-full max-w-md">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Yangi todo qo'shing..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 px-4 transition-colors"
          >
            +
          </button>
        </div>
      </form>

      <ul className="w-full max-w-md space-y-2">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            id={`todo-${index}`}
            className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            {editingIndex === index ? (
              <form onSubmit={saveEdit} className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                <span>{todo}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(index)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
