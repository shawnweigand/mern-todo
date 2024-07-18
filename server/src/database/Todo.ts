import { Schema, model } from "mongoose";

export type Todo = {
    task: string;
    completed: boolean;
}

const todoSchema = new Schema<Todo>({
    task: String,
    completed: Boolean,
});

const Todo = model('Todo', todoSchema);

module.exports = {
    Todo
};