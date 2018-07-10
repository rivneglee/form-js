import React from 'react';
import Resizeable from 're-resizable';

const withResizer = (ComposedComponent, onResize = () => {}) => class extends React.Component {
    onResizeStop = (evt, direction, ref, delta) => {
      const { width, height } = this.props;
      const newWidth = width + delta.width;
      const newHeight = height + delta.height;
      onResize({
        width: newWidth,
        height: newHeight,
      });
    };

    render() {
      const { width, height, ...rest } = this.props;
      return (
        <Resizeable width={width} height={height} onResizeStop={this.onResizeStop}>
          <ComposedComponent {...rest} width="100%" height="100%" />
        </Resizeable>
      );
    }
};

export default withResizer;
