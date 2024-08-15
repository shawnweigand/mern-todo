import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';


export default function TodoList() {

    const appUrl = process.env.REACT_APP_URL;

    const { register, handleSubmit, formState: {errors} } = useForm();
    const onSubmit = data => addTodo();
    const onErrors = data => console.error(errors);

    const validation = {
        name: { required: "Name is required" }
    };

    const [todos, setTodos] = useState([]);

    const [task, setTask] = useState({
        name: '',
        description: '',
        completed: false,
    });

    const getTodos = async () => {
        axios.get(`${appUrl}:5000/todos`)
        .then(response => setTodos(response.data))
        .catch(error => console.error(error));
    }

    const addTodo = async () => {
        try {
          const response = await axios.post(`${appUrl}:5000/todos`, { task });
          setTodos([...todos, response.data]);
          setTask({name: '', description: '', completed: false});
        } catch (error) {
          console.error(error);
        }
    };

    const removeTodo = async (id, e) => {
        try {
          const response = await axios.delete(`${appUrl}:5000/todos/${id}`);
          setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
          console.error(error);
        }
    };

    const completeTodo = async (todo, e) => {
        try {
            const response = await axios.put(`${appUrl}:5000/todos/${todo._id}`, {
                "name": todo.name,
                "description": todo.description,
                "completed": !todo.completed
            });
            getTodos();
          } catch (error) {
            console.error(error);
          }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div>
            <form className="relative mt-10 rounded-md flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit, onErrors)}>
                <input {...register('name', validation.name)} className={`font-bold mr-3 block w-1/2 rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:ring-indigo-600 ring-gray-300`} placeholder="Write task name here..." value={task.name} onChange={(e) => setTask({"name": e.target.value, "description": task.description, "completed": task.completed})} />
                <small className="mt-2 text-red-600 italic">
                    {errors?.name && `${errors?.name?.message}`}
                </small>
                <textarea {...register('description')} className="my-5 mr-3 block w-1/2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Write task description here..." value={task.description} onChange={(e) => setTask({"name": task.name, "description": e.target.value, "completed": task.completed})} />
                <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" />
                    Add To-Do
                </button>    
            </form>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {todos.map((todo) => (
                    <div key={todo._id} className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                            <button onClick={(e) => completeTodo(todo)} className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                {todo.completed && <CheckIcon aria-hidden="true" className="h-6 w-6 text-white" />}
                            </button>
                            {todo.name}
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600">{todo.description}</dd>
                        <button onClick={(e) => removeTodo(todo._id, e)} className="absolute right-20 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 hover:bg-red-500">
                            <TrashIcon aria-hidden="true" className="h-6 w-6 text-white" />
                        </button>
                    </div>
                ))}
                </dl>
            </div>
        </div>
    )
}