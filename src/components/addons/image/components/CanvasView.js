/* @flow */
import React from 'react';
import '../image-addon.scss';
import type { ItemProps } from '../../types';

export default class extends React.Component<ItemProps> {
  render() {
    const { id, width, height } = this.props;
    return (
      <div id={id} className="image-canvas-view__container" style={{ width, height }}>
        <i className="fa fa-4x fa-image" />
      </div>
    );
  }
}
