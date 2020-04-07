import React from 'react';

const Month = props => {
  const {id, month, selectMonth, selectedMonth} = props;
  const currentMonth = new Date().getMonth();

  const monthStyle = () => {
    let style = "month";
    if (id === currentMonth) {
      style += " currentMonth";
    }
    if (id === parseInt(selectedMonth)) {
      style += " selectedMonth";
    }
    return style;
  }

  return (
    <button onClick={selectMonth} value={id} className={monthStyle()}>
      { month }
    </button>
  )
}

export default Month;
