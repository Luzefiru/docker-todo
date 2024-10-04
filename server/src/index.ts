import { Hono } from 'hono';
import { db } from './db';
import { todos } from './db/schema';
import { eq } from 'drizzle-orm';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(cors());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/todos', async (c) => {
  const data = await db.select().from(todos);
  return c.json({ success: true, data, msg: 'Successfully fetched all todos' });
});

app.post('/todos', async (c) => {
  const { content, due } = await c.req.json();

  if (!content) {
    return c.json({ success: false, data: null, msg: 'Missing content data' });
  }

  if (!due) {
    return c.json({ success: false, data: null, msg: 'Missing due data' });
  }

  const insertedTodo = await db
    .insert(todos)
    .values({ content, due })
    .returning();

  return c.json({
    success: true,
    data: insertedTodo,
    msg: 'Successfully inserted todo',
  });
});

app.delete('/todos/:id', async (c) => {
  const targetId = Number(c.req.param('id'));

  await db.delete(todos).where(eq(todos.id, targetId));

  return c.json({
    success: true,
    data: null,
    msg: 'Successfully deleted todo',
  });
});

app.onError((_, c) => {
  return c.json(
    { success: false, data: null, msg: 'An unexpected error occured' },
    500
  );
});

export default {
  port: 3001,
  fetch: app.fetch,
};
