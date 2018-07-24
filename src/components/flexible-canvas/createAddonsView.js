/* @flow */
import { withResizerAndPositioner } from '../../high-order';
import type { AddOn } from '../addons';

export default (addons: Array<AddOn>) => {
  const map = {};
  addons.forEach((addon: AddOn) => {
    const { type, CanvasView } = addon;
    map[type] = withResizerAndPositioner(CanvasView);
  });
  return map;
};
