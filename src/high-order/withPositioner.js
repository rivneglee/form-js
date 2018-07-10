import React from 'react';

const withPositioner = ComposedComponent => class extends React.Component {
  render() {
    const {
      x, y, className, ...rest
    } = this.props;
    return (
      <div className={className || ''} style={{ position: 'absolute', left: x, top: y }}>
        <ComposedComponent {...rest} />
      </div>
    );
  }
};

export default withPositioner;
