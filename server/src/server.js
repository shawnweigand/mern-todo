import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router as todosRoute } from './routes/todos.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost:27017/mern-stack-db";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/todos', todosRoute);

export { express, mongoose };