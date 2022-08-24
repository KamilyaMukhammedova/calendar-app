import {GET_SELECTED_DATE, SHOW_MODAL} from "../actions/calendarActions";

const initialState = {
  isShowModal: false,
  date: null,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {...state, isShowModal: action.payload};
    case GET_SELECTED_DATE:
      return {...state, date: action.payload};
    default:
      return state;
  }
};

export default calendarReducer;