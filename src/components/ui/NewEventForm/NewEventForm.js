import React, {useState} from 'react';
import './NewEventForm.css';
import {useDispatch, useSelector} from "react-redux";
import {showModal} from "../../../store/actions/calendarActions";

const NewEventForm = (props) => {
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

    console.log(newEvent);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let eventsArray = [];

    if (localStorage.getItem('events')) {
      eventsArray = JSON.parse(localStorage.getItem('events'));
    }

    if ((eventsArray.find(event => event.date === selectedDateByUser))) {
      const eventsArrayCopy = eventsArray.map(event => {
        if (event.date === selectedDateByUser) {
          return {
            ...event,
            dayEvents: [...event.dayEvents, newEvent],
          }
        }
        return event;
      });
      localStorage.setItem("events", JSON.stringify(eventsArrayCopy));
    } else {
      eventsArray.push({
        date: selectedDateByUser,
        dayEvents: [newEvent]
      });
      localStorage.setItem("events", JSON.stringify(eventsArray));
    }
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