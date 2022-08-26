import React, {useEffect} from 'react';
import useCalendar from "../../hooks/useCalendar";
import Modal from "../ui/Modal/Modal";
import NewEventForm from "../ui/NewEventForm/NewEventForm";
import {useDispatch, useSelector} from "react-redux";
import {editEvent, getItemsFromLocalStorage, getSelectedDate, showModal} from "../../store/actions/calendarActions";
import './Calendar.css';

const Calendar = () => {
  const dispatch = useDispatch();

  const stateEvents = useSelector(state => state.stateEvents);

  const {
    calendarRows, selectedDate, todayFormatted, daysShort,
    monthNames, getNextMonth, getPrevMonth, getCurrentDay
  } = useCalendar();

  const isShowModal = useSelector(state => state.isShowModal);

  useEffect(() => {
    dispatch(getSelectedDate(todayFormatted));
    dispatch(getItemsFromLocalStorage(JSON.parse(localStorage.getItem('events'))));
  }, [dispatch, todayFormatted]);


  const dayCalendarClickHandler = date => {
    dispatch(getSelectedDate(date));
  };

  const openNewEvent = () => {
    dispatch(editEvent(false));
    dispatch(showModal(true));
  };

  const closeNewEvent = () => {
    dispatch(showModal(false));
  };

  const showEventsTitles = (date) => {
    const day = stateEvents.find(day => day.date === date);
    if (day) {
      console.log('day')
      return day.dayEvents.map(event => (
        <span style={{display: 'block'}} key={event.id}>{event.title}</span>
      ));
    }
  };

  const getCalendar = () => {
    return Object.values(calendarRows).map(cols => (
        <tr key={cols[0].date}>
          {cols.map(col => (
            col.date === todayFormatted
              ? <td
                key={col.date}
                className={`${col.classes} today`}
                onClick={() => dayCalendarClickHandler(col.date)}
              >
                <button
                  className="newEventBtn"
                  onClick={() => openNewEvent(col.date)}
                >
                  <i className="bi bi-plus-square-dotted"></i>
                </button>
                <span>{col.value}</span>
                <p>{showEventsTitles(col.date)}</p>
              </td>
              : <td
                key={col.date}
                className={col.classes}
                onClick={() => dayCalendarClickHandler(col.date)}
              >
                <button
                  className="newEventBtn"
                  onClick={() => openNewEvent()}
                >
                  <i className="bi bi-plus-square-dotted"></i>
                </button>
                <span>{col.value}</span>
                <p>{showEventsTitles(col.date)}</p>
              </td>
          ))}
        </tr>
      )
    );
  };

  return (
    <>
      <Modal show={isShowModal} closed={closeNewEvent}>
        <NewEventForm/>
      </Modal>
      <div className="calendar">
        <div className="flexBoxCalendar">
          <p className="month">{`${monthNames[selectedDate.getMonth()]}-${selectedDate.getFullYear()}`}</p>
          <div className="flexBoxBtn">
            <button type="button" className="btn prev" onClick={getPrevMonth}>
              <i className="bi bi-chevron-double-left"></i>
            </button>
            <button type="button" className="btn prev" onClick={getCurrentDay}>Today</button>
            <button type="button" className="btn next" onClick={getNextMonth}>
              <i className="bi bi-chevron-double-right"></i>
            </button>
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
          {getCalendar()}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;