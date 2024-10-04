'use client';

import { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo } from '@/services/todos.services';

type Todo = {
  id: number;
  content: string;
  due: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoContent, setNewTodoContent] = useState('');
  const [newTodoDue, setNewTodoDue] = useState('');

  useEffect(() => {
    async function fetchTodos() {
      const result = await getTodos();
      setTodos(result.data);
    }

    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    if (!newTodoContent || !newTodoDue) {
      alert('Please enter both content and due date.');
      return;
    }

    const newTodo = await createTodo(newTodoContent, newTodoDue);
    setTodos((prevTodos) => [...prevTodos, newTodo.data[0]]);
    setNewTodoContent('');
    setNewTodoDue('');
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1>Create a New Todo</h1>
        <input
          type="text"
          placeholder="Todo content"
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
          className="border p-2 mr-2 rounded text-black"
        />
        <input
          type="date"
          value={newTodoDue}
          onChange={(e) => setNewTodoDue(e.target.value)}
          className={`border p-2 mr-2 rounded ${
            !newTodoDue.length ? 'text-neutral-400' : 'text-black'
          }`}
        />
        <button
          onClick={handleCreateTodo}
          className="bg-blue-500 text-white p-2.5 px-4 rounded"
        >
          Add Todo
        </button>
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {todos.length
          ? todos.map((t) => {
              return (
                <div
                  className="border border-neutral-800 p-4 px-8 rounded w-full flex justify-between items-center gap-8"
                  key={t.id}
                >
                  <div>
                    <p className="text-lg">{t.content}</p>
                    <p className="text-neutral-400 text-sm">
                      Due Date: {t.due}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(t.id)}
                    className="bg-red-500 text-white p-2 rounded text-xs hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : 'No todos found.'}
      </main>
    </div>
  );
}
