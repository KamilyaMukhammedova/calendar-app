import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {createStore} from "redux";
import calendarReducer from "./store/reducers/calendarReducer";
import {Provider} from "react-redux";
import './index.css';

const store = createStore(calendarReducer);

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);

