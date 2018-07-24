import React from 'react';
import { createSelectable } from 'react-selectable-fast';

const withSelectableWrapper = (ComposedComponent) => {
  const Wrapper = class extends React.Component {
    render() {
      const {
        selectableRef,
        selected,
        selecting,
        width,
        height,
        ...rest
      } = this.props;
      const selectingCss = selecting ? 'selecting' : '';
      const selectedCss = selected ? 'selected' : '';
      return (
        <div ref={selectableRef} className={`${selectingCss} ${selectedCss}`} style={{ width, height }}>
          <ComposedComponent width={width} height={height} {...rest} />
        </div>
      );
    }
  };

  return createSelectable(Wrapper);
};

export default withSelectableWrapper;
