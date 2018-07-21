/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { itemsReducer, selectedItemReducer } from '../reducers';
import { Workspace } from '../index';

const store = createStore(
  combineReducers({
    selectedItem: selectedItemReducer,
    items: itemsReducer,
  }),
);

ReactDOM.render(
  <Provider store={store}>
    <Workspace />
  </Provider>,
  document.getElementById('wrapper'),
);
