import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editEvent, getItemsFromLocalStorage, showModal} from "../../../store/actions/calendarActions";
import {nanoid} from "nanoid";
import './NewEventForm.css';

const NewEventForm = () => {
  const dispatch = useDispatch();

  const [newEvent, setNewEvent] = useState({
    title: '',
    text: '',
  });

  const selectedDateByUser = useSelector(state => state.date);
  const isEdit = useSelector(state => state.isEdit);
  const editEventId = useSelector(state => state.editEventId);
  const stateEvents = useSelector(state => state.stateEvents);

  const eventsFromLocalStorage = JSON.parse(localStorage.getItem('events'));

  useEffect(() => {
    if (isEdit) {
      const editDay = eventsFromLocalStorage.find(day => day.date === selectedDateByUser);
      console.log(editDay)

      if (editDay) {
        const editEvent = editDay.dayEvents.find(event => event.id === editEventId);
        setNewEvent({
          title: editEvent.title,
          text: editEvent.text
        });
      }
    }
  }, [isEdit, editEventId, stateEvents]);


  const onChangeHandler = (e) => {
    const {name, value} = e.target;

    setNewEvent(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (newEvent.text !== '' || newEvent.title !== '') {
      if (!isEdit) {
        let eventsArray = [];
        if (eventsFromLocalStorage) {
          eventsArray = eventsFromLocalStorage;
        }
        if ((eventsArray.find(event => event.date === selectedDateByUser))) {
          const eventsArrayCopy = eventsArray.map(event => {
            if (event.date === selectedDateByUser) {
              return {
                ...event,
                dayEvents: [...event.dayEvents, {...newEvent, id: nanoid()}],
              }
            }
            return event;
          });
          localStorage.setItem("events", JSON.stringify(eventsArrayCopy));
          dispatch(getItemsFromLocalStorage(eventsArrayCopy));
        } else {
          eventsArray.push({
            date: selectedDateByUser,
            dayEvents: [{...newEvent, id: nanoid()}]
          });
          localStorage.setItem("events", JSON.stringify(eventsArray));
          dispatch(getItemsFromLocalStorage(eventsArray));
        }
      } else {
        const arrayWithEditEvent = eventsFromLocalStorage.map(day => {
          if (day.date === selectedDateByUser) {
            return {
              ...day,
              dayEvents: day.dayEvents.map(event => {
                if (event.id === editEventId) {
                  return {
                    ...event,
                    title: newEvent.title,
                    text: newEvent.text,
                  }
                }
                return event;
              }),
            }
          }
          return day;
        });

        localStorage.setItem("events", JSON.stringify(arrayWithEditEvent));
        dispatch(getItemsFromLocalStorage(arrayWithEditEvent));
      }

    }

    dispatch(showModal(false));
    setNewEvent({title: '', text: ''});
    dispatch(editEvent(false));
  };

  const closeForm = () => {
    dispatch(showModal(false));
    setNewEvent({title: '', text: ''});
  };


  return (
    <div className="formBox">
      <form onSubmit={onSubmitHandler}>
        <h2 className="title">{selectedDateByUser}</h2>
        <div className="box">
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={onChangeHandler}
            placeholder="Add some title"
            className="input"
          />
        </div>
        <div>
          <textarea
            name="text"
            value={newEvent.text}
            onChange={onChangeHandler}
            cols="30"
            rows="10"
            placeholder="Your event description here"
            className="textarea"
          />
        </div>
        <div className="btnsBox">
          <button type="submit" disabled={newEvent.title === '' || newEvent.text === ''}>
            {isEdit? <span>Edit</span> : <span>Add</span>}
          </button>
          <button type="button" onClick={() => closeForm()}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default NewEventForm;