import React from 'react';
import { withDraggableWrapper } from '../../../high-order';
import { DND_GROUP } from '../constants';

const withDraggableAddons = ComposedComponent => (props) => {
  const { addons, ...otherProps } = props;

  const draggableAddons = addons.map((addon) => {
    const { ToolboxView, ...rest } = addon;
    const Wrapper = withDraggableWrapper(DND_GROUP)(ToolboxView);
    return {
      ToolboxView: Wrapper,
      ...rest,
    };
  });
  return <ComposedComponent addons={draggableAddons} {...otherProps} />;
};

export default withDraggableAddons;
