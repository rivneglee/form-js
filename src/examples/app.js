/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { itemsReducer, selectedItemReducer } from '../reducers';
import { Workspace, Canvas } from '../index';

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

// const Foo = ({width, height}) => (
//   <div style={{backgroundColor:"yellow", width, height}}></div>
// );
//
// const Bar = ({width, height}) => (
//   <div style={{backgroundColor:"grey", width, height}}></div>
// );
//
// const addons = [
//   {
//     type: 'foo',
//     CanvasView: Foo
//   },
//   {
//     type: 'bar',
//     CanvasView: Bar
//   }
// ];
//
// const items = [
//   {
//     id: 'foo',
//     type: 'foo',
//     x: 525,
//     y: 101,
//     width: 100,
//     height: 100,
//   },
//   {
//     id: 'bar',
//     type: 'bar',
//     x: 225,
//     y: 301,
//     width: 200,
//     height: 200,
//   },
// ]
//
// ReactDOM.render(
//   <Canvas id="canvas" addons={addons} items={items} />,
//   document.getElementById('wrapper'),
// );