import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function App() {
  const [todos, setTodos] = useState([]); // Todo ro'yxati
  const [todoText, setTodoText] = useState(""); // Yangi todo input qiymati
  const [editingIndex, setEditingIndex] = useState(null); // Tahrirlanayotgan todo indeksi
  const [editText, setEditText] = useState(""); // Tahrirlash input qiymati

  // LocalStorage'dan todolarni yuklash
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
    setTodos(storedTodos);
  }, []);

  // Todolarni LocalStorage'ga saqlash
  const saveTodos = (todos) => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  };

  // Yangi todo qo'shish
  const addTodo = (e) => {
    e.preventDefault();
    if (todoText.trim() === "") {
      return; // Bo'sh qiymat kiritilganda hech narsa qilmaymiz
    } else if (todos.includes(todoText)) {
      return; // Takrorlanmasligini tekshiramiz
    } else {
      const newTodos = [...todos, todoText];
      setTodos(newTodos);
      saveTodos(newTodos);
      setTodoText("");
    }
  };

  // Todoni o'chirish
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  
 

  // Todoni tahrirlashni boshlash
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(todos[index]);
  };

  // Todoni tahrirlashni saqlash
  const saveEdit = (e) => {
    e.preventDefault();
    if (editText.trim() === "") {
      return; // Bo'sh qiymat kiritilganda hech narsa qilmaymiz
    } else {
      const newTodos = [...todos];
      newTodos[editingIndex] = editText;
      setTodos(newTodos);
      saveTodos(newTodos);
      setEditingIndex(null); // Tahrirlash rejimini yopamiz
      setEditText(""); // Inputni tozalaymiz
    }
  };

  return (
    <div className="min-h-screen bg-[#caf0f8] flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mt-12 mb-6">
        ToDo List!
      </h1>
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
        {todos.map((todo, index) => (
          <li
            key={index}
            id={`todo-${index}`}
            className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            {editingIndex === index ? (
              // Tahrirlash rejimi
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
              // Oddiy ko'rinish
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
