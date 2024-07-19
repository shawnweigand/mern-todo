import { mongoose } from '../server.js';

// export type Todo = {
//     task: string;
//     completed: boolean;
// }

const todoSchema = mongoose.Schema({
    task: String,
    completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

export { Todo };