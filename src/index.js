import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const initialState = {
  cols: 8,
  rows: 8,
  bombs: 10,
  remaining: 8 * 8 - 10,
  size: 3,
  board: [],
  running: false,
  cheat: false,
};

ReactDOM.render(
  <App initialState={initialState} />,
  document.getElementById('root')
);
