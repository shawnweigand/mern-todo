import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Todo = {
  _id: string;
  name: string;
  description: string;
  completed: boolean;
};  

export default function TodoList() {

    const [todos, setTodos] = useState<Todo[]>([]);

    const [task, setTask] = useState({
        name: '',
        description: ''
    });

    const addTodo = async () => {
        try {
          const response = await axios.post('http://localhost:5000/todos', { task });
          setTodos([...todos, response.data]);
          setTask({name: '', description: ''});
        } catch (error) {
          console.error(error);
        }
    };

    useEffect(() => {
        // Fetch data from the Express server
        axios.get('http://localhost:5000/todos')
          .then(response => setTodos(response.data))
          .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Write task here..." value={task.name} onChange={(e) => setTask({"name": e.target.value, "description": "This is a test description."})} />
                <button onClick={addTodo} className="block text-sm font-medium leading-6 text-gray-900">Add To-Do</button>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {todos.map((todo) => (
                    <div key={todo._id} className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                            <CheckIcon aria-hidden="true" className="h-6 w-6 text-white" />
                            </div>
                            {todo.name}
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600">{todo.description}</dd>
                        <button className="absolute right-20 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                            <TrashIcon aria-hidden="true" className="h-6 w-6 text-white" />
                        </button>
                    </div>
                ))}
                </dl>
            </div>
        </div>
    )
}