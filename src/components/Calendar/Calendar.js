import React from 'react';
import useCalendar from "../../hooks/useCalendar";
import './Calendar.css';

const Calendar = () => {
  const {
    calendarRows, selectedDate, todayFormatted, daysShort,
    monthNames, getNextMonth, getPrevMonth
  } = useCalendar();

  const dateClickHandler = date => {
    console.log(date);
  };

  return (
    <div className="calendar">
      <div className="flexBox">
        <p className="month">{`${monthNames[selectedDate.getMonth()]}-${selectedDate.getFullYear()}`}</p>
        <div>
          <button type="button" className="btn prev" onClick={getPrevMonth}>Prev</button>
          <button type="button" className="btn next" onClick={getNextMonth}>Next</button>
        </div>
      </div>
      <table className="table">
        <thead>
        <tr>
          {daysShort.map(day => (
            <th key={day}>{day}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {
          Object.values(calendarRows).map(cols => {
            return <tr key={cols[0].date}>
              {cols.map(col => (
                col.date === todayFormatted
                  ? <td
                    key={col.date} className={`${col.classes} today`}
                    onClick={() => dateClickHandler(col.date)}
                  >
                    {col.value}
                  </td>
                  : <td
                    key={col.date} className={col.classes}
                    onClick={() => dateClickHandler(col.date)}
                  >
                    {col.value}
                  </td>
              ))}
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;