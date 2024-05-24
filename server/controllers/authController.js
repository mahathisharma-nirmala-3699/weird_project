import { pool } from "../database.js";
import bcrypt from "bcrypt";

import jwtGenerator from "../jwtGenerator.js";

const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    // Compare provided password with hashed password from the database
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    // Generate JWT token
    const token = jwtGenerator(user.rows[0].id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAccount = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body;

    // Validation checks
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword);

    // Insert user into the database with hashed password
    const newUser = await pool.query(
      "INSERT INTO users(name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, username, email, hashedPassword]
    );

    //generating jwt

    const token = jwtGenerator(newUser.rows[0].id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAccount = (req, res) => {
  res.status(200).json({ message: "weird logisnsn" });
};


const verifyToken = (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const dashBoard = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT username FROM users WHERE user_id = $1",
      [req.user]
    ); 

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server error");
  }
};



const deleteAccount = (req, res) => {
  res.status(200).json({ message: "weird logisnsn" });
};

export { loginAccount, createAccount, updateAccount, deleteAccount,dashBoard,  verifyToken};
