/* @flow */
import React, { Component } from 'react';
import ScrollBar from '../../scrollbar';
import { withDndWrapper, withDroppableWrapper } from '../../../high-order';

type Props = {
  items: Array<any>,
};

const renderChildren = children => React.Children.map(children, c => c);

const Item = ({ width, height, color }) => (
  <div style={{ width, height, backgroundColor: color }} />
);

const View = ({ items }) => (
  <div className="canvas">
    <ScrollBar>{renderChildren(items)}</ScrollBar>
  </div>
);

const Canvas = class extends Component<Props> {
  render() {
    return <View items={[]} />;
  }
};

export default withDndWrapper(withDroppableWrapper()(Canvas));
