import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import Month from './components/Month';
import Store from './Store';

const App = () => {

  const [dates, setDates] = useState(dateArray(new Date().getFullYear(), new Date().getMonth()));
  const [day, setDay] = useState(new Date().getDate() - 1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [wrapperWidth, setWrapperWidth] = useState();
  const [hideMessage, setHideMessage] = useState("");
  const [touchStart, setTouchStart] = useState({ pos: 0, time: 0});
  const months = [
    { id: 0, name: "Jan" },
    { id: 1, name: "Feb" },
    { id: 2, name: "Mar" },
    { id: 3, name: "Apr" },
    { id: 4, name: "May" },
    { id: 5, name: "Jun" },
    { id: 6, name: "Jul" },
    { id: 7, name: "Aug" },
    { id: 8, name: "Sep" },
    { id: 9, name: "Oct" },
    { id: 10, name: "Nov" },
    { id: 11, name: "Dec" },
  ];

  useEffect(() => {
    setWrapperWidth(document.getElementById("tw").offsetWidth);
    const input = document.getElementById("todo-input");
    const handleKey = (e) => {
      if (e.keyCode === 39 && input.value.length < 1) nextDate();
      if (e.keyCode === 37 && input.value.length < 1) prevDate();
    }

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setHideMessage("hidden");
    }, 5000)
  }, [])

  function dateArray(y, m) {
    let result = [];
    let index = 0;
    let firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    while (firstDay <= lastDay) {
      result.push({id: index, date: new Date(firstDay)});
      firstDay.setDate(firstDay.getDate() + 1);
      index += 1;
    }
    return result;
  }

  const nextDate = () => {
    if (day < dates.length-1) {
      setDay(day + 1);
    }
  }

  const prevDate = () => {
    if (day > 0) {
      setDay(day - 1);
    }
  }

  const handleContainerClick = (contId) => {
    if (contId > day) {
      setDay(day + 1);
    } else {
      setDay(day - 1);
    }
  }

  const handleMonthSelect = (e) => {
    const sMonth = parseInt(e.target.value);
    e.preventDefault();
    if (sMonth === new Date().getMonth()) {
      setDay(new Date().getDate() - 1)
    } else {
      setDay(0);
    }
    setSelectedMonth(sMonth);
    setDates(dateArray(new Date().getFullYear(), sMonth));
  }

  const handleTouchStart = (e) => {
    setTouchStart({
      pos: e.touches[0].clientX,
      time: new Date()
    });
  }

  const handleTouchEnd = (e) => {
    const endPos = e.changedTouches[0].clientX;
    const timeElapsed = new Date() - touchStart.time;
    if ((touchStart.pos + 100) < endPos && timeElapsed < 1000) {
      return prevDate();
    }
    if ((touchStart.pos - 100) > endPos && timeElapsed < 1000) {
      return nextDate();
    }
  }

  return (
    <Store>
    <div className={`message ${hideMessage}`}>
    You can use ARROW KEYS on the keyboard or SWIPE on touchscreen devises to navigate</div>
      <div className="months">
        { months.map(month => <Month key={month.id}
          id={month.id} month={month.name}
          selectedMonth={selectedMonth} selectMonth={handleMonthSelect}/>) }
      </div>
      <button onClick={prevDate} className="slider-button prev">
        <i className="fas fa-arrow-circle-left"></i>
      </button>
      <button onClick={nextDate} className="slider-button next">
        <i className="fas fa-arrow-circle-right"></i>
      </button>
      <div className="todos-wrapper" id="tw">
        <div className="todos-slider" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        style={{ 'transform': `translateX(-${day*wrapperWidth}px)` }}>
          { dates.map(dt => <Todo containerClick={handleContainerClick}
            key={dt.id} id={dt.id} num={day} date={dt.date.toString().split('00:')[0]}/>) }
        </div>
      </div>
    </Store>
  );
}

export default App;
