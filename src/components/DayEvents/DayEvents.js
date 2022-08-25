import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './DayEvents.css';
import {getItemsFromLocalStorage} from "../../store/actions/calendarActions";

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
  };

  const removeEvent = (date, id) => {
    console.log(date);
    console.log(id)
    console.log(eventsFromLocalStorage)
    const newEventsArray = eventsFromLocalStorage.map(item => {
      if(item.date === date) {
        return {
          ...item,
          dayEvents: item.dayEvents.filter(event => event.id !== id)
        }
      }
      return item;
    });
    localStorage.setItem("events", JSON.stringify(newEventsArray));
    dispatch(getItemsFromLocalStorage(newEventsArray));
    console.log(newEventsArray);
  };

  return (
    <div className="eventsBox">
      <h4>{dateInState} events:</h4>
      {selectedDayEvents ?
        <ul>
          {selectedDayEvents.dayEvents.map((item) => (
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