import React, {useEffect} from 'react';
import useCalendar from "../../hooks/useCalendar";
import Modal from "../ui/Modal/Modal";
import './Calendar.css';
import NewEventForm from "../ui/NewEventForm/NewEventForm";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedDate, showModal} from "../../store/actions/calendarActions";

const Calendar = () => {
  const dispatch = useDispatch();

  const {
    calendarRows, selectedDate, todayFormatted, daysShort,
    monthNames, getNextMonth, getPrevMonth
  } = useCalendar();

  const isShowModal = useSelector(state => state.isShowModal);


  useEffect(() => {
    dispatch(getSelectedDate(todayFormatted));
  }, [dispatch, todayFormatted]);

  const dayCalendarClickHandler = date => {
    dispatch(getSelectedDate(date));
  };

  const openNewEvent = () => {
    dispatch(showModal(true));
  };

  const closeNewEvent = () => {
    dispatch(showModal(false));
  };

  return (
    <>
      <Modal show={isShowModal} closed={closeNewEvent}>
        <NewEventForm/>
      </Modal>
      <div className="calendar">
        <div className="flexBox">
          <p className="month">{`${monthNames[selectedDate.getMonth()]}-${selectedDate.getFullYear()}`}</p>
          <div className="flexBoxBtn">
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
                      key={col.date}
                      className={`${col.classes} today`}
                      onClick={() => dayCalendarClickHandler(col.date)}
                    >


                      {
                        JSON.parse(localStorage.getItem('events'))&&
                        (JSON.parse(localStorage.getItem('events'))).find(event => event.date === col.date)
                          ?
                          <span className="round"/> : null
                      }


                      <button
                        className="newEventBtn"
                        onClick={() => openNewEvent(col.date)}
                      >
                        <i className="bi bi-plus-square-dotted"></i>
                      </button>
                      <span>{col.value}</span>
                    </td>
                    : <td
                      key={col.date}
                      className={col.classes}
                      onClick={() => dayCalendarClickHandler(col.date)}
                    >
                      {
                        JSON.parse(localStorage.getItem('events'))&&
                        (JSON.parse(localStorage.getItem('events'))).find(event => event.date === col.date) ?
                          <span className="round"/> : null
                      }
                      <button
                        className="newEventBtn"
                        onClick={() => openNewEvent()}
                      >
                        <i className="bi bi-plus-square-dotted"></i>
                      </button>
                      <span>{col.value}</span>
                    </td>
                ))}
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;