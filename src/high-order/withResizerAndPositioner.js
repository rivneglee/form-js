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
  onResize?: (width: number, height: number) => void,
  onMove?: (x: number, y: number, deltaX: number, deltaY: number) => void,
  disableDragging?: boolean,
  disableResizing?: boolean,
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

    onResize = (evt: any, direction: any, ref: any) => {
      const { onResize } = this.props;
      this.setState({
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      });
      if (onResize) {
        onResize(ref.offsetWidth, ref.offsetHeight);
      }
    };

    onMove = (evt: any, position: Coordinate) => {
      const { onMove, x, y } = this.props;
      const newX = position.x;
      const newY = position.y;
      const deltaX = newX - x;
      const deltaY = newY - y;
      this.setState({ x, y });
      if (onMove) {
        onMove(newX, newY, deltaX, deltaY);
      }
    };

    render() {
      const {
        width, height, x, y,
      } = this.state;
      const {
        className, disableDragging, disableResizing, ...rest
      } = this.props;
      const resizingOptions = {
        bottom: !disableResizing,
        bottomLeft: !disableResizing,
        bottomRight: !disableResizing,
        left: !disableResizing,
        right: !disableResizing,
        top: !disableResizing,
        topLeft: !disableResizing,
        topRight: !disableResizing,
      };
      return (
        <Rnd
          className={className || ''}
          size={{ width, height }}
          disableDragging={disableDragging}
          enableResizing={resizingOptions}
          position={{ x, y }}
          onDrag={this.onMove}
          onResize={this.onResize}
        >
          <ComposedComponent
            disableDragging={disableDragging}
            {...rest}
            width="100%"
            height="100%"
          />
        </Rnd>
      );
    }
};
