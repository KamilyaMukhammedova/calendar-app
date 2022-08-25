import {
  EDIT_EVENT,
  GET_ITEMS_FROM_LOCALSTORAGE,
  GET_SELECTED_DATE,
  ON_EDIT_EVENT_ID,
  SHOW_MODAL
} from "../actions/calendarActions";

const initialState = {
  isShowModal: false,
  date: null,
  stateEvents: [],
  isEdit: false,
  editEventId: null,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {...state, isShowModal: action.payload};
    case GET_SELECTED_DATE:
      return {...state, date: action.payload};
    case GET_ITEMS_FROM_LOCALSTORAGE:
      return {...state, stateEvents: action.payload};
    case EDIT_EVENT:
      return {...state, isEdit: action.payload};
    case ON_EDIT_EVENT_ID:
      return {...state, editEventId: action.payload};
    default:
      return state;
  }
};

export default calendarReducer;