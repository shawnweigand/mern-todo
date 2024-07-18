import { express } from '../src/server';
const router = express.Router();
const { Todo } = require('../database/Todo');

router.get('/', async (req: any, res: any) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Create a new todo
router.post('/', async (req: any, res: any) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});
// Update an existing todo
router.put('/:id', async (req: any, res: any) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
});
// Delete a todo
router.delete('/:id', async (req: any, res: any) => {
    await Todo.findByIdAndRemove(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
});

module.exports = router;