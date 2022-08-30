import React, {useEffect} from 'react';
import useCalendar from "../../hooks/useCalendar";
import Modal from "../ui/Modal/Modal";
import NewEventForm from "../ui/NewEventForm/NewEventForm";
import {useDispatch, useSelector} from "react-redux";
import {
  editEvent,
  getItemsFromLocalStorage,
  getSelectedDate,
  hideEventsList,
  showModal
} from "../../store/actions/calendarActions";
import './Calendar.css';

const Calendar = () => {
  const dispatch = useDispatch();
  const stateEvents = useSelector(state => state.stateEvents);
  const isShowModal = useSelector(state => state.isShowModal);

  const {
    calendarRows, selectedDate, todayFormatted, daysShort,
    monthNames, getNextMonth, getPrevMonth, getCurrentDay
  } = useCalendar();

  useEffect(() => {
    dispatch(getSelectedDate(todayFormatted));
    dispatch(getItemsFromLocalStorage(JSON.parse(localStorage.getItem('events'))));
  }, [dispatch, todayFormatted]);

  const dayCalendarClickHandler = date => {
    dispatch(getSelectedDate(date));
    dispatch(hideEventsList(false));
  };

  const openNewEvent = () => {
    dispatch(editEvent(false));
    dispatch(hideEventsList(false));
    dispatch(showModal(true));
  };

  const closeNewEvent = () => {
    dispatch(showModal(false));
  };

  const showEventsTitles = (date) => {
    if(stateEvents) {
      const day = stateEvents.find(day => day.date === date);
      if (day) {
        return day.dayEvents.map(event => (
          <span key={event.id} className="eventTitle">{event.title}</span>
        ));
      }
    }
  };

  const onNextMonth = () => {
    getNextMonth();
    dispatch(hideEventsList(true));
  };

  const onPrevMonth = () => {
    getPrevMonth();
    dispatch(hideEventsList(true));
  };

  const onCurrentDay = () => {
    getCurrentDay();
    dispatch(hideEventsList(false));
    dispatch(getSelectedDate(todayFormatted));
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
            <button type="button" className="btn prev" onClick={onPrevMonth}>
              <i className="bi bi-chevron-double-left"/>
            </button>
            <button type="button" className="btn prev" onClick={onCurrentDay}>Today</button>
            <button type="button" className="btn next" onClick={onNextMonth}>
              <i className="bi bi-chevron-double-right"/>
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
          {Object.values(calendarRows).map(cols => {
            return <tr key={cols[0].date}>
              {cols.map(col => (
                col.date === todayFormatted ?
                  <td key={col.date} className={`${col.classes} today`}
                      onClick={() => dayCalendarClickHandler(col.date)}>
                    <div className="dayBox">
                      <button className="newEventBtn" onClick={() => openNewEvent(col.date)}>
                        <i className="bi bi-plus-square-dotted"></i>
                      </button>
                      <span className="date">{col.value}</span>
                      <div className="events">{showEventsTitles(col.date)}</div>
                    </div>
                  </td> :
                  <td key={col.date} className={col.classes} onClick={() => dayCalendarClickHandler(col.date)}>
                    <div className="dayBox">
                      <button className="newEventBtn" onClick={() => openNewEvent()}>
                        <i className="bi bi-plus-square-dotted"></i>
                      </button>
                      <span>{col.value}</span>
                      <div className="events">{showEventsTitles(col.date)}</div>
                    </div>
                  </td>
              ))}
            </tr>
          })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;