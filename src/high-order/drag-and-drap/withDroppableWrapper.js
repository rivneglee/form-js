import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

const defaultEventHandlers = {
  onDrop: () => {},
};

const withDroppableWrapper = (
  type = 'global',
  eventHandlers = defaultEventHandlers,
) => (ComposedComponent) => {
  const Wrapper = class extends React.Component {
    render() {
      const { connectDropTarget, ...rest } = this.props;
      return connectDropTarget(
        <div style={{ height: '100%', width: '100%' }}>
          <ComposedComponent {...rest} />
        </div>,
      );
    }
  };

  const { onDrop } = eventHandlers;

  const spec = {
    drop(props, monitor, component) {
      /* eslint-disable-next-line */
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const y = clientOffset.y - hoverBoundingRect.top;
      const x = clientOffset.x - hoverBoundingRect.left;
      onDrop(
        {
          type: monitor.getItemType(),
          position: { x, y },
          positionDelta: monitor.getDifferenceFromInitialOffset(),
        },
        monitor.getItem(),
        props,
      );
    },
  };

  return DropTarget(type, spec, collect)(Wrapper);
};

export default withDroppableWrapper;
