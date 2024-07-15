const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const todosRoute = require('./routes/todos');

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://mongodb:27017/mern-stack-db";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/todos', todosRoute);
