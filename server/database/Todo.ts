import { mongoose } from "../server";

const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo
};