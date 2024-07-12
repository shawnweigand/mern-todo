const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost/mern-stack-db', { useNewUrlParser: true, useUnifiedTopology: true });
// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add this to server.js
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  });

const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
  });

const Todo = mongoose.model('Todo', todoSchema);
