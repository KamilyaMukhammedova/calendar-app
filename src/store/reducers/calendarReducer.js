import {GET_ITEMS_FROM_LOCALSTORAGE, GET_SELECTED_DATE, SHOW_MODAL} from "../actions/calendarActions";

const initialState = {
  isShowModal: false,
  date: null,
  stateEvents: []
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {...state, isShowModal: action.payload};
    case GET_SELECTED_DATE:
      return {...state, date: action.payload};
    case GET_ITEMS_FROM_LOCALSTORAGE:
      return {...state, stateEvents: action.payload};
    default:
      return state;
  }
};

export default calendarReducer;