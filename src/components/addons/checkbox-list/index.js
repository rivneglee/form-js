/* @flow */
import ToolboxView from './components/ToolboxView';
import CanvasView from './components/CanvasView';
import defaultProps from './defaultProps';
import type { AddOn } from '../types';

export default ({
  type: 'checkbox-list',
  CanvasView,
  ToolboxView,
  defaultProps,
}: AddOn);
