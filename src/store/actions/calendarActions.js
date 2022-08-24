export const SHOW_MODAL = 'SHOW_MODAL';
export const GET_SELECTED_DATE = 'GET_SELECTED_DATE';

export const showModal = isShow => ({type: SHOW_MODAL, payload: isShow});
export const getSelectedDate = date => ({type: GET_SELECTED_DATE, payload: date});

