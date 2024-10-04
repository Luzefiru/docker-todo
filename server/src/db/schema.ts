import { pgTable, serial, text, date } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  content: text('content'),
  due_date: date('due_date'),
});
