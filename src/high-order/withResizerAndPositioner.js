/* @flow */
import React, { Component } from 'react';
import type { ComponentType as C } from 'react';
import Rnd from 'react-rnd';
import { objectCompare } from '../utils';

type Coordinate = {
  x: number,
  y: number,
};

type OtherProps = {
  width: number | string,
  height: number | string,
  className?: string,
};

type Props = Coordinate & OtherProps;

type State = {
  width: number | string,
  height: number | string,
} & Coordinate;

export default (ComposedComponent: C<OtherProps>) => class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      width, height, x, y,
    } = props;
    this.state = {
      width,
      height,
      x,
      y,
    };
  }

  componentWillReceiveProps(props: Props) {
    if (!objectCompare(props, this.props, ['x', 'y', 'height', 'width'])) {
      const {
        width, height, x, y,
      } = props;
      this.setState({
        width,
        height,
        x,
        y,
      });
    }
  }

    onResize = (evt: any, direction: any, ref: any, delta: any, position: Coordinate) => {
      this.setState({
        width: ref.style.width,
        height: ref.style.height,
        ...position,
      });
    };

    onMove = (evt: any, position: Coordinate) => {
      const { x, y } = position;
      this.setState({ x, y });
    };

    render() {
      const {
        width, height, x, y,
      } = this.state;
      const { className, ...rest } = this.props;
      return (
        <Rnd
          className={className || ''}
          size={{ width, height }}
          position={{ x, y }}
          onDragStop={this.onMove}
          onResize={this.onResize}
        >
          <ComposedComponent {...rest} width="100%" height="100%" />
        </Rnd>
      );
    }
};
