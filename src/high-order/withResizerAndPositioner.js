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

    onResizeStop = (evt: any, direction: any, ref: any) => {
      this.setState({
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      });
    };

    onResize = (evt: any, direction: any, ref: any) => {
      const { onResize } = this.props;
      if (onResize) {
        onResize(ref.offsetWidth, ref.offsetHeight);
      }
    };

    onMoveStop = (evt: any, position: Coordinate) => {
      const { x, y } = position;
      this.setState({ x, y });
    };

    onMove = (evt: any, position: Coordinate) => {
      const { onMove } = this.props;
      if (onMove) {
        const newX = position.x;
        const newY = position.y;
        const deltaX = evt.movementX;
        const deltaY = evt.movementY;
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
          onDragStop={this.onMoveStop}
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
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
