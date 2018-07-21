/* @flow */
import React from 'react';
import type { ComponentType as C } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

type Props = {
  onDrop: (Object, Object, Object) => void,
};

type OtherProps = {
  connectDropTarget: any,
  isOver: boolean,
  canDrop: boolean,
};

const withDroppableWrapper = (type: string = 'global') => (ComposedComponent: C<*>) => {
  const Wrapper = class extends React.Component<Props & OtherProps> {
    render() {
      const { connectDropTarget, ...rest } = this.props;
      return connectDropTarget(
        <div style={{ height: '100%', width: '100%' }}>
          <ComposedComponent {...rest} />
        </div>,
      );
    }
  };

  const spec = {
    drop(props, monitor, component) {
      /* eslint-disable-next-line */
      const node = findDOMNode(component);
      if (!node) return;
      // $flow-disable-line
      const hoverBoundingRect = node.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const y = clientOffset.y - hoverBoundingRect.top;
      const x = clientOffset.x - hoverBoundingRect.left;
      const { onDrop } = props;
      onDrop(
        {
          position: { x, y },
          positionDelta: monitor.getDifferenceFromInitialOffset(),
        },
        monitor.getItem(),
        monitor.getItemType(),
        props,
      );
    },
  };

  return DropTarget(type, spec, collect)(Wrapper);
};

export default withDroppableWrapper;
