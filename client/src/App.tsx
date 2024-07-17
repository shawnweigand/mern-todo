import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';

// Import this!
type Todo = {
  _id: string;
  task: string;
  completed: boolean;
};  

const App = () => {

  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo) => {
    setTodos(todos.concat(newTodo));
  };

  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );

};

export default App;