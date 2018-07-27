/* @flow */
import React, { Component } from 'react';
import type { ComponentType as C } from 'react';
import Rotater from '../components/rotater';
import { objectCompare } from '../utils';

type OtherProps = {
  width: number | string,
  height: number | string,
};

type Props = {
  deg: number,
  onRotate?: (deg: number) => void,
} & OtherProps;

type State = {
  deg: number,
};

export default (ComposedComponent: C<OtherProps>) => class extends Component<Props, State> {
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

  onRotateStop = ({ deg }: {deg: number}) => {
    const { onRotate } = this.props;
    const newDeg = Math.ceil(deg);
    if (onRotate) {
      onRotate(newDeg);
    }
  };

  render() {
    const {
      width,
      height,
      deg,
      ...rest
    } = this.props;
    return (
      <Rotater height={height} width={width} deg={deg} onRotateStop={this.onRotateStop}>
        <ComposedComponent height={height} width={width} {...rest} />
      </Rotater>
    );
  }
};
