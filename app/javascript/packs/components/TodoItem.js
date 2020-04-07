import React, { useContext } from 'react';
import { TodoContext } from '../Store';

const TodoItem = (props) => {

  const { id, title, time, completed } = props;
  const [state, dispatch] = useContext(TodoContext);

  const removeTodo = (e) => {
    e.preventDefault();
    dispatch({ type: 'REMOVE_TODO', payload: id });
  }

  const markDone = () => {
    dispatch({ type: 'COMPLETE_TODO', payload: id });
  }

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`} onClick={markDone}>
      <div className="item-time">
        <p>{time}</p>
      </div>
      <div className="item-title">
        <h2>{title}</h2>
      </div>
      <div className="item-buttons">
        <button onClick={removeTodo}><i className="fas fa-trash-alt"></i></button>
      </div>
    </div>
  )
}

export default TodoItem;
