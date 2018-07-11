/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { itemsReducer, selectedItemReducer } from '../reducers';
import { withDndWrapper } from '../high-order';

import { Canvas } from '../index';

const View = withDndWrapper(Canvas);

const store = createStore(
  combineReducers({
    selectedItem: selectedItemReducer,
    items: itemsReducer,
  }),
);

ReactDOM.render(
  <Provider store={store}>
    <View />
  </Provider>,
  document.getElementById('wrapper'),
);
