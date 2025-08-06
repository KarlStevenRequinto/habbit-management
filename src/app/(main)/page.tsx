"use client";
import { useState } from "react";
import MainContainer from "../components/main-container";

interface Todo {
    id: number;
    text: string;
    isDone: boolean;
}

export default function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [text, setText] = useState("");

    const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim()) return;

        const newTodo: Todo = {
            id: Date.now(),
            text: text.trim(),
            isDone: false,
        };

        setTodos((prev) => [...prev, newTodo]);
        setText("");
    };

    const handleDelete = (id: number) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const handleToggleDone = (id: number) => {
        setTodos(
            (prev) =>
                prev.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)).sort((a, b) => Number(a.isDone) - Number(b.isDone)) // done todos at the bottom
        );
    };

    return (
        <MainContainer>
            <h2>📝 Todo List</h2>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    placeholder="Add a task..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ padding: "8px", width: "70%" }}
                />
                <button type="submit" style={{ padding: "8px 12px", marginLeft: 8 }}>
                    Add
                </button>
            </form>

            <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 8,
                            textDecoration: todo.isDone ? "line-through" : "none",
                            opacity: todo.isDone ? 0.5 : 1,
                        }}
                    >
                        <span>{todo.text}</span>
                        <div>
                            <button onClick={() => handleToggleDone(todo.id)}>{todo.isDone ? "Undo" : "Done"}</button>
                            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: 8 }}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </MainContainer>
    );
}
