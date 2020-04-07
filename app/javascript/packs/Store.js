import React, { createContext, useReducer, useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

export const TodoContext = createContext({});

const Store = ({ children }) => {
  const initialTodoState = { todos: [] }
  const memoizedReducer = useCallback(todoReducer, initialTodoState);
  const [todos, setTodos] = useReducer(memoizedReducer, initialTodoState);

  useEffect(() => {
    //Fetching all Todos from DB
    Axios.get('/api/v1/todos').then(res => {
      setTodos({ type: 'LOAD_TODOS', payload: res.data})
    });
  }, [])

  function todoReducer(state, action) {
    const { todos } = state;
    switch(action.type) {
      case 'LOAD_TODOS':
        return {todos: action.payload}
      case 'ADD_TODO': {
        addTodo(action.payload);
        return {todos: [...todos]};
      }
      case 'ADD_TODO_TO_DOM': {
        return {todos: [...todos, action.payload]};
      }
      case 'REMOVE_TODO': {
        removeTodo(action.payload);
        return {todos: [...todos.filter(todo => action.payload !== todo.id)]};
      }
      case 'COMPLETE_TODO':
        markTodo(action.payload);
        return {todos: [...todos.map(todo => {
          if (todo.id === action.payload) {
            todo.completed = !todo.completed
          }
          return todo;
        })]};
      default:
        return todos;
    }
  }

  //Add Todo to DB
  function addTodo(todoItem) {
    return Axios.post('/api/v1/todos', {
      todo: {
        title: todoItem.title,
        date: todoItem.date,
        time: todoItem.time
      }
    }).then(res => {
      setTodos({ type: 'ADD_TODO_TO_DOM', payload: res.data });
    })
  }

  //remove Todo from DB
  function removeTodo(id) {
    Axios.delete(`./api/v1/todos/${id}`);
  }

  //mark complete or vice-versa to DB
  function markTodo(id) {
    Axios.patch(`./api/v1/todos/${id}`);
  }

  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {children}
    </TodoContext.Provider>
  )
}

export default Store;
