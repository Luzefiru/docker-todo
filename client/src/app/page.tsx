'use client';

import { useEffect, useState } from 'react';
import { getTodos } from '@/services/todos.services';

type Todo = {
  id: number;
  content: string;
  due: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      const result = await getTodos();
      setTodos(result.data);
    }

    fetchTodos();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {todos.length
          ? todos.map((t) => {
              return (
                <div
                  className="border border-neutral-800 p-4 px-8 rounded w-full"
                  key={t.id}
                >
                  <p className="text-lg">{t.content}</p>
                  <p className="text-neutral-400 text-sm">Due Date: {t.due}</p>
                </div>
              );
            })
          : 'No todos found.'}
      </main>
    </div>
  );
}
