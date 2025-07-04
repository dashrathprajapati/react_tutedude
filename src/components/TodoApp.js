import React, { useState } from "react";
import "./TodoApp.css";

export default function TodoApp() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (input.trim() === "") {
      alert("Enter a Todo in textbox");
      return;
    }

    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
    alert("Successfully Todo added!");
  };

  const handleCheckboxChange = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !todos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="todo-container">
      <h1>Assignment-2: To-Do App</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Todo list"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed && "completed"}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
