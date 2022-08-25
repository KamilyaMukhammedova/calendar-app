import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getItemsFromLocalStorage, showModal} from "../../../store/actions/calendarActions";
import {nanoid} from "nanoid";
import './NewEventForm.css';

const NewEventForm = () => {
  const dispatch = useDispatch();

  const [newEvent, setNewEvent] = useState({
    title: '',
    text: '',
  });

  const selectedDateByUser = useSelector(state => state.date);


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
      let eventsArray = [];

      if (localStorage.getItem('events')) {
        eventsArray = JSON.parse(localStorage.getItem('events'));
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
    }

    dispatch(showModal(false));
    setNewEvent({title: '', text: ''});
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
          <button type="submit">Add</button>
          <button type="button" onClick={() => closeForm()}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default NewEventForm;