import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend'; // import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

const withDndWrapper = (ComposedComponent) => {
  const Wrapper = class extends React.Component {
    render() {
      return (
        <div style={{ height: '100%', width: '100%' }}>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  };

  return DragDropContext(HTML5Backend)(Wrapper);
};

export default withDndWrapper;
