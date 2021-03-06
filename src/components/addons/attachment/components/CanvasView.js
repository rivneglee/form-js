import React from 'react';
import '../style.scss';
import type { ItemProps } from '../../types';

type OtherProps = {};

type State = {};

export default class extends React.PureComponent<ItemProps & OtherProps, State> {
  render() {
    const { id, width, height } = this.props;
    return (
      <div
        className="addon-attachment"
        id={id}
        style={{
          width,
          height,
        }}
      >
        List
      </div>
    );
  }
}
