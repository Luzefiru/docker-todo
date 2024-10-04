import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_TODOS_BASE_URL || 'http://127.0.0.1:3001/todos';

export async function getTodos() {
  const { data } = await axios.get(BASE_URL);
  return data;
}

export async function createTodo(content: string, due: string) {
  const { data } = await axios.post(BASE_URL, { content, due });
  return data;
}

export async function deleteTodo(id: number) {
  const { data } = await axios.delete(`${BASE_URL}/${id}`);
  return data;
}
