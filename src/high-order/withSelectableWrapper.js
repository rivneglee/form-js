import React from 'react';
import { createSelectable } from 'react-selectable-fast';

const withSelectableWrapper = (ComposedComponent) => {
  const Wrapper = class extends React.Component {
    render() {
      const {
        selectableRef,
        isSelected,
        width,
        height,
        ...rest
      } = this.props;
      const selectedCss = isSelected ? 'selected' : '';
      return (
        <div ref={selectableRef} className={selectedCss} style={{ width, height }}>
          <ComposedComponent width={width} height={height} {...rest} />
        </div>
      );
    }
  };

  return createSelectable(Wrapper);
};

export default withSelectableWrapper;
