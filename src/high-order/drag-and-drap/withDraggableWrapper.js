import React from 'react';
import { DragSource } from 'react-dnd';

const dragSource = {
  beginDrag(props) {
    return { ...props };
  },

  endDrag(props) {
    return { ...props };
  },

  canDrag({ disableDragging }) {
    return !disableDragging;
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const withDraggableWrapper = (type = 'global', draggingOpacity = 0.5) => (ComposedComponent) => {
  const Wrapper = class extends React.Component {
    render() {
      const { isDragging, connectDragSource, ...rest } = this.props;
      return connectDragSource(
        <div
          style={{
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            opacity: isDragging ? draggingOpacity : 1,
          }}
        >
          <ComposedComponent {...rest} />
        </div>,
      );
    }
  };
  return DragSource(type, dragSource, collect)(Wrapper);
};

export default withDraggableWrapper;
