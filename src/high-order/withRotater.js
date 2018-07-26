/* @flow */
import React, { Component } from 'react';
import type { ComponentType as C } from 'react';
import Rotater from 'react-drag-rotater';
import { objectCompare } from '../utils';

type Props = {
  deg: number,
  onRotate?: (deg: number) => void,
  width: number | string,
  height: number | string,
};

type State = {
  deg: number,
};

export default (ComposedComponent: C<Props>) => class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { deg } = props;
    this.state = { deg };
  }

  componentWillReceiveProps(props: Props) {
    if (!objectCompare(props, this.props, ['deg'])) {
      const { deg } = props;
      this.setState({
        deg,
      });
    }
  }

  onRotate = ({ deg }: {deg: number}) => {
    const { onRotate } = this.props;
    const newDeg = Math.ceil(deg);
    this.setState({
      deg: newDeg,
    });

    if (onRotate) {
      onRotate(newDeg);
    }
  };

  render() {
    const { deg } = this.state;
    const { width, height } = this.props;
    const style = { width, height, transformOrigin: 'center center' };
    return (
      <div style={{ transform: `rotate(${deg}deg)`, ...style }}>
        <ComposedComponent height={height} width={width} {...this.props} />
        <Rotater onRotate={this.onRotate} origin="center-center" />
      </div>
    );
  }
};
