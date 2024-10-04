import { Hono } from 'hono';
import { db } from './db';
import { todos } from './db/schema';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/todos', async (c) => {
  const data = await db.select().from(todos);
  return c.json({ success: true, data });
});

export default app;
