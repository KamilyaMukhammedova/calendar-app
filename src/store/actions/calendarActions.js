export const SHOW_MODAL = 'SHOW_MODAL';
export const GET_SELECTED_DATE = 'GET_SELECTED_DATE';
export const GET_ITEMS_FROM_LOCALSTORAGE = 'GET_ITEMS_FROM_LOCALSTORAGE';
export const EDIT_EVENT = 'EDIT_EVENT';
export const ON_EDIT_EVENT_ID = 'ON_EDIT_EVENT_ID';

export const showModal = isShow => ({type: SHOW_MODAL, payload: isShow});
export const getSelectedDate = date => ({type: GET_SELECTED_DATE, payload: date});
export const getItemsFromLocalStorage = items => ({type: GET_ITEMS_FROM_LOCALSTORAGE, payload: items});
export const editEvent = isEdit => ({type: EDIT_EVENT, payload: isEdit});
export const onEditEventId = eventId => ({type: ON_EDIT_EVENT_ID, payload: eventId});

