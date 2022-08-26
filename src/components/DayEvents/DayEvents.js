import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editEvent, getItemsFromLocalStorage, onEditEventId, showModal} from "../../store/actions/calendarActions";
import './DayEvents.css';

const DayEvents = () => {
  const dispatch = useDispatch();
  const dateInState = useSelector(state => state.date);
  const stateEvents = useSelector(state => state.stateEvents);
  const isHideEventsList = useSelector(state => state.isHideEventsList);

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

  const openEditForm = (date, id) => {
    dispatch(editEvent(true));
    dispatch(onEditEventId(id));
    dispatch(showModal(true));

  };

  const removeEvent = (date, id) => {
    let isObjectRemovedFromLocalStorage = false;

    const arrayWithoutRemovedEvent = eventsFromLocalStorage.map((item) => {
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
      {
        !isHideEventsList ?
          <>
            <h4>{dateInState} :</h4>
            {selectedDayEvents ?
              <div>
                {selectedDayEvents.dayEvents.map(item => (
                  <div key={item.id} className="eventContent">
                    <div>
                      <p className="titleEvent">{item.title}</p>
                      <p className="text">{item.text}</p>
                    </div>
                    <div className="btnsArea">
                      <button
                        type="button"
                        className="dayBtn edit"
                        onClick={() => openEditForm(selectedDayEvents.date, item.id)}
                      >
                        <i className="bi bi-pencil-fill"/>
                      </button>
                      <button
                        type="button"
                        className="dayBtn remove"
                        onClick={() => removeEvent(selectedDayEvents.date, item.id)}
                      >
                        <i className="bi bi-trash-fill"/>
                      </button>
                    </div>
                  </div>
                ))}
              </div> :
              <p>No events</p>
            }
          </> :
          <h4>Click on date to see events</h4>
      }
    </div>
  );
};

export default DayEvents;