/* @flow */
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import '../style.scss';

type RotateData = {
  deg: number,
  rad: number,
};

type Props = {
  deg: number,
  width: number | string,
  height: number | string,
  onRotateStart: () => void,
  onRotate: (data: RotateData) => void,
  onRotateStop: (data: RotateData) => void,
  children: Node,
};

type State = RotateData;

export default class extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { deg } = props;
    this.state = {
      rad: 0,
      deg,
    };
  }

  componentDidMount() {
    if (this.ref) {
      const {
        width,
        height,
        left,
        top,
      } = this.ref.getBoundingClientRect();
      this.originX = left + (width / 2);
      this.originY = top + (height / 2);
      this.lastRad = 0;
    }
  }

  componentWillReceiveProps(props: Props) {
    const {
      deg,
    } = props;
    this.setState({
      deg,
    });
  }

  onRotateStart = (evt: SyntheticMouseEvent<HTMLDivElement>) => {
    this.startX = evt.pageX;
    this.startY = evt.pageY;
    this.dragging = true;
    window.addEventListener('mousemove', this.onRotate, false);
    window.addEventListener('mouseup', this.onRotateStop, false);
    evt.preventDefault();
    evt.stopPropagation();
  };

  onRotate = (evt: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onRotateStart, onRotate } = this.props;
    if (this.dragging) {
      const { pageX, pageY } = evt;
      if (pageX !== this.startX && pageY !== this.startY) {
        if (onRotateStart) {
          onRotateStart();
        }
        let rad = Math.atan2(pageY - this.originY, pageX - this.originX);
        rad -= Math.atan2(this.startY - this.originY, this.startX - this.originX);
        rad += this.lastRad;
        const deg = rad * (360 / (2 * Math.PI));
        this.setState({ rad, deg });
        if (onRotate) {
          onRotate({ rad, deg });
        }
      }
    }
    evt.preventDefault();
    evt.stopPropagation();
  };

  onRotateStop = () => {
    const { rad } = this.state;
    const { onRotateStop } = this.props;
    this.dragging = false;
    this.lastRad = rad;
    window.removeEventListener('mousemove', this.onRotate, false);
    window.removeEventListener('mouseup', this.onRotateStop, false);
    if (onRotateStop) {
      onRotateStop(this.state);
    }
  };

  setRef = (ref: ?HTMLDivElement) => {
    this.ref = ref;
  };

  originX: number;

  originY: number;

  ref: ?HTMLDivElement;

  dragging: boolean;

  lastRad: number;

  startX: number;

  startY: number;

  render() {
    const { deg } = this.state;
    const { children, width, height } = this.props;
    return (
      <div className="rotater__wrapper" ref={this.setRef} style={{ width, height, transform: `rotate(${deg}deg)` }}>
        {children}
        <div className="rotater rotater__handle" onMouseDown={this.onRotateStart} />
      </div>
    );
  }
}
