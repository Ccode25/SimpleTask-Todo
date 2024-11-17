import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "superuser",
  host: "localhost",
  port: 5433,
  database: "perntodo",
});

export default pool;
