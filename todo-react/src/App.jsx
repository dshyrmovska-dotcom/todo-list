import { useState } from "react";
import editIcon from "./assets/edit.png";
import deleteIcon from "./assets/trash.png";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    const addFunc = () => {
        const inputEl = document.getElementById("todoInput");
        if (!inputEl) return;

        const value = inputEl.value.trim();
        if (value === "") return;

        const newTodo = {
            id: Date.now(),
            text: value,
        };

        setTodos([...todos, newTodo]);

        inputEl.value = "";
        setText("");
    };

    const editFunc = (id) => {
        const current = todos.find((item) => item.id === id);
        if (!current) return;

        const changed = prompt("change", current.text);
        if (!changed) return;

        const cleanText = changed.trim();
        if (cleanText === "") return;

        const nextTodos = todos.map((item) => {
            if (item.id === id) {
                return { ...item, text: cleanText };
            }
            return item;
        });

        setTodos(nextTodos);
    };

    const deleteFunc = (id) => {
        const nextTodos = todos.filter((item) => item.id !== id);
        setTodos(nextTodos);
    };

    return (
        <div className="todo-wrapper">
            <div className="text-wrapper">
                <input
                    id="todoInput"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="add-button" onClick={addFunc}>
                    Add
                </button>
            </div>

            <div className="todo-list">
                {todos.map((todo) => (
                    <section key={todo.id} className="list-element">
                        <p>{todo.text}</p>

                        <div className="action-wrapper">
                            <button
                                className="editBtn"
                                onClick={() => editFunc(todo.id)}
                            >
                                <img src={editIcon} alt="edit" />
                            </button>

                            <button
                                className="deleteBtn"
                                onClick={() => deleteFunc(todo.id)}
                            >
                                <img src={deleteIcon} alt="delete" />
                            </button>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
