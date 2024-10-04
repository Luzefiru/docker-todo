import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const client = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export const db = drizzle(client);
