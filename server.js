require("dotenv").config();
const PORT = process.env.PORT ?? 8000;
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
//this will require the db.js, which has commands to read and setup stuff, db.js
//use db instead of pool when using knex
const db = require("./db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json()); // Include this middleware for JSON parsing, used to be bodyparser

app.get("/", (req, res) => {
  res.send("wasssup");
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await db.select("*").from("todos");
    //dont need todos.rows since using knex
    res.json(todos);
    // console.log("this is todos:", todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get the todos of a certain email address used as a parameter inside of the URL
app.get(`/todos/:userEmail`, async (req, res) => {
  //   console.log(req, "this is req with param");
  const { userEmail } = req.params;
  // const obj = req.params;
  // console.log("this is the req.params.userEmail:", userEmail);
  try {
    const todos = await db
      .select("*")
      .from("todos")
      .where("user_email", userEmail);
    //dont need todos.rows since using knex
    res.json(todos);
    // res.json(todos[0].title);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create a new todo
app.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  const id = uuidv4();
  // console.log("server stuff:", id, user_email, title, progress, date);
  try {
    const newToDo = await db("todos")
      .insert({
        id,
        user_email,
        title,
        progress,
        date,
      })
      .returning("*");

    res.json(newToDo[0]);
  } catch (error) {
    console.error(error);
  }
});

//edit a todo

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const updatedTodo = await db("todos")
      .where({ id })
      .update({ user_email, title, progress, date })
      .returning("*");

    if (updatedTodo.length === 0) {
      return res.status(404).json({ error: "todo not found" });
    }

    res.json(updatedTodo[0]);
  } catch (error) {
    console.error(error);
  }
});

//delete a todo by id

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await db("todos").where({ id }).delete();

    res.json(deleteTodo);
  } catch (error) {
    console.error(error);
  }
});

//signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const signUp = await db("users").insert({
      email,
      hashed_password: hashedPassword,
    });

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    res.json({ email, token });
  } catch (error) {
    console.error(error);
    if (error) {
      res.json({ detail: error.detail });
    }
  }
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await db.select("*").from("users").where({ email });

    if (!users.length) {
      return res.json({ detail: "user does not exist!" });
    }

    const success = await bcrypt.compare(password, users[0].hashed_password);
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if (success) {
      res.json({ email: users[0].email, token });
    } else {
      res.json({ detail: "login failed buddddyyyy" });
    }
  } catch (error) {
    console.log("catch errorr dude");
    console.error(error);
  }
});

// //old way using pg and pool, instead we will use knex, replacing query with nothing, and pool with db
// app.get("/todos", async (req, res) => {
//   try {
//     const todos = await pool.query("SELECT * FROM todos");
//     res.json(todos.rows);
//   } catch (err) {
//     console.error(err);
//   }
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
