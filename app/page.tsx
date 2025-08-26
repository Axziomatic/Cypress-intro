"use client";

import { useState } from "react";

interface Todo {
  id: string;
  text: string;
}

let mockedTodos: Todo[] = [
  { id: "1", text: "Feed the cat" },
  { id: "2", text: "Ignore the dog" },
  { id: "3", text: "Walk all the cats" },
];

export default function Home() {
  const [todos, setTodos] = useState(mockedTodos);

  const handleDelete = () => {
    const setTodo = todos.pop();
  };

  return (
    <main>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </main>
  );
}
