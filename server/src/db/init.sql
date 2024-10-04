-- Migration to create the 'todos' table
CREATE TABLE
  IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    content TEXT,
    due_date DATE
  );