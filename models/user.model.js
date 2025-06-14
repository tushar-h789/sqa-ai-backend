const db = require("../config/db");

// User Table Creation
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      otp VARCHAR(6) NOT NULL,
      otp_expiry TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '10 minutes',
      is_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.none(query);  
};

// Create a new User
const createUser = async (name, email, password, otp) => {
  console.log("data", name, email, password, otp);
  
  const query = `
    INSERT INTO users (name, email, password, otp)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, otp;
  `;
  const result = await db.one(query, [name, email, password, otp]);
  return result;
};

// Fetch All Users (Optional)
const getUsers = async () => {
  const query = `SELECT * FROM users`;
  const result = await db.any(query);
  return result;
};

module.exports = { createUserTable, createUser, getUsers };
