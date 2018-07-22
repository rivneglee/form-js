/* @flow */
import { connect } from 'react-redux';
import { withDraggableWrapper, withResizerAndPositioner } from '../../high-order';
import type { AddOn, ItemProps } from '../addons';
import { updateItemPropsActionCreator } from '../../actions';

const mapDispatchToProps = dispatch => ({
  onPropsChanged: props => dispatch(updateItemPropsActionCreator(props)),
});

const mapStateToProps = ({ items }, ownProps: ItemProps) => {
  const { id } = ownProps;
  return items[id] || {};
};

export default (addons: Array<AddOn>) => {
  const map = {};
  addons.forEach((addon: AddOn) => {
    const { type, CanvasView } = addon;
    map[type] = connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withResizerAndPositioner(withDraggableWrapper('canvas_item', 0.1)(CanvasView)));
  });
  return map;
};
