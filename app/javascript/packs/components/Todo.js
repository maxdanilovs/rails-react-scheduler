import React, { useContext } from 'react';
import Axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { TodoContext } from '../Store';

const Todo = props => {

  const [state, dispatch] = useContext(TodoContext);
  const activeCard = (props.id === props.num);

  function displayTodos(todos) {
    const todoList = [];
    todos.sort((a, b) => (a.time > b.time) ? 1 : -1);
    todos.map(todo => {
      const date1 = new Date(todo.date).setHours(0,0,0,0);
      const date2 = new Date(props.date).setHours(0,0,0,0);
      if (date1.valueOf() === date2.valueOf()) {
        todoList.push(<TodoItem key={todo.id}
          title={todo.title} time={todo.time}
          id={todo.id} completed={todo.completed}/>)
      }
    })
    return todoList;
  }

  function displayTodoForm(condition) {
    if (condition) {
      return <TodoForm date={props.date} active={activeCard}/>
    }
  }

  return (
    <div className={`todo-container ${ activeCard ? 'active' : ''}`}>
      <a className={`container-cover ${ activeCard ? 'disabled' : ''}`}
      onClick={() => props.containerClick(props.id)}></a>
      <div className="card-header">
        { props.date }
      </div>
      <div className="card-body">
        { displayTodoForm(activeCard) }
        <div className="todo-item-container">
          { displayTodos(state.todos) }
        </div>
      </div>
    </div>
  )
}

export default Todo;
