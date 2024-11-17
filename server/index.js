import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Routes
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *;",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get specific todos
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1;", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//update specific todos
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const editTodos = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *;",
      [description, id]
    );
    res.json(editTodos.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//delete todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id=$1 RETURNING *;",
      [id]
    );
    //If no rows where deleted
    if (deleteTodo.rowCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
});
