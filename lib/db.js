import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME,
  port : process.env.DATABASE_PORT,
  host : process.env.DATABASE_URL
});

export default pool;
