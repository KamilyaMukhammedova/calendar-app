import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getItemsFromLocalStorage, showModal} from "../../store/actions/calendarActions";
import './DayEvents.css';

const DayEvents = () => {
  const dispatch = useDispatch();
  const dateInState = useSelector(state => state.date);
  const stateEvents = useSelector(state => state.stateEvents);

  const [selectedDayEvents, setSelectedDaysEvents] = useState(null);
  const eventsFromLocalStorage = JSON.parse(localStorage.getItem('events'));

  useEffect(() => {
    setSelectedDaysEvents(null);
    if (eventsFromLocalStorage) {
      const selectedDayObject = eventsFromLocalStorage.find(event => event.date === dateInState);
      if (selectedDayObject) {
        setSelectedDaysEvents(selectedDayObject);
      }
    }
  }, [dateInState, stateEvents]);

  const editEvent = (date, id) => {
    console.log(date);
    console.log(id)
    dispatch(showModal(true));
  };

  const removeEvent = (date, id) => {
    let isObjectRemovedFromLocalStorage = false;

    const arrayWithoutRemovedEvent = eventsFromLocalStorage.map((item, index) => {
      if (item.date === date) {
        if (item.dayEvents.length === 1) {
          isObjectRemovedFromLocalStorage = true;
          return item;
        } else {
          return {
            ...item,
            dayEvents: item.dayEvents.filter(event => event.id !== id)
          }
        }

      }
      return item;
    });


    if (!isObjectRemovedFromLocalStorage) {
      localStorage.setItem("events", JSON.stringify(arrayWithoutRemovedEvent));
      dispatch(getItemsFromLocalStorage(arrayWithoutRemovedEvent));
    } else {
      const arrayWithoutRemovedDay = eventsFromLocalStorage.filter(item => item.date !== date);
      localStorage.setItem("events", JSON.stringify(arrayWithoutRemovedDay));
      dispatch(getItemsFromLocalStorage(arrayWithoutRemovedDay));
    }
  };

  return (
    <div className="eventsBox">
      <h4>{dateInState} events:</h4>
      {selectedDayEvents ?
        <ul>
          {selectedDayEvents.dayEvents.map(item => (
            <li key={item.id}>
              <span>{item.title}: <span>{item.text}</span></span>
              <button
                type="button"
                onClick={() => editEvent(selectedDayEvents.date, item.id)}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => removeEvent(selectedDayEvents.date, item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        :
        <p>No events</p>
      }
    </div>
  );
};

export default DayEvents;