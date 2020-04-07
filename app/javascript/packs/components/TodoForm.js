import React, { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../Store';

const TodoForm = (props) => {

  const [state, dispatch] = useContext(TodoContext);
  const [todo, setTodo] = useState({ id: "", title: "", date: "", time: "" });
  const [time, setTime] = useState({ hour: '00', minute: '00'});
  const hours = hoursArray();
  const minutes = ['00', '15', '30', '45'];

  useEffect(() => {
    const input = document.getElementById("todo-input");
    setTimeout(() => {
      input.focus();
    }, 500)
    return () => {
      input.blur();
    }
  }, [])

  function hoursArray() {
    let hours = [];
    for(let i = 0; i < 24; i += 1) {
      i < 10 ? hours.push(`0${i}`) : hours.push(`${i}`)
    }
    return hours;
  }

  const hourOptions = () => {
    const options = [];
    hours.map(hour => {
      options.push(<option key={hour} value={hour}>{hour}</option>)
    })
    return options;
  }

  const minuteOptions = () => {
    const options = [];
    minutes.map(minute => {
      options.push(<option key={minute} value={minute}>{minute}</option>)
    })
    return options;
  }

  const submitTodo = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TODO', payload: todo});
    setTodo({ id: "", title: "", date: "", time: "" });
    setTime({ hour: '00', minute: '00'});
  }

  return (
    <div className={`form-container ${ props.active ? 'form-active' : ''}`}>
      <form className="todo-form">
        <div className="select-form">
          <select className="time-select"
          value={time.hour}
          onChange={(e) => setTime({hour: e.target.value, minute: time.minute})}>
            { hourOptions() }
          </select>
          <select className="time-select minutes"
          value={time.minute}
          onChange={(e) => setTime({minute: e.target.value, hour: time.hour})}>
            { minuteOptions() }
          </select>
        </div>
        <input
        id="todo-input"
        type="text"
        value={todo.title}
        onChange={(e) => setTodo({ id: 'xyz',
          title: e.target.value, date: props.date, time: `${time.hour}:${time.minute}` })}/>
        <button className="todo-form-button" onClick={submitTodo}>Add Todo</button>
      </form>
    </div>
  )
}

export default TodoForm;
