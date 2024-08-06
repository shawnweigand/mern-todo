import { CheckIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './Partials/TodoList';
// import TodoForm from './TodoForm';

export default function TodoPage() {

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">To-Do List</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Track your tasks and check off your list
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Type your task name and description below and submit to add to your to-do list. 
            After completing a task, check it off or delete it from your list for good.
          </p>
        </div>
        <TodoList />
      </div>
    </div>
  )
}