"use client";

import { useState } from "react";

interface Todo {
  id: string;
  text: string;
}

let mockedTodos: Todo[] = [
  { id: "1", text: "Feed the cat" },
  { id: "2", text: "Ignore the dog" },
  { id: "2", text: "Walk all the cats" },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDelete = () => {
    const setTodo = todos.pop();
  };

  return (
    <main>
      <ul>
        <div className="flex">
          <li>Feed the cat</li>
          <button
            onClick={() => {
              handleDelete();
            }}
            className="mx-2"
          >
            Delete
          </button>
        </div>
        <div className="flex">
          <li>Ignore the dog</li>
          <button className="mx-2">Delete</button>
        </div>
        <div className="flex">
          <li>Walk all the cats</li>
          <button className="mx-2">Delete</button>
        </div>
      </ul>
    </main>
  );
}
