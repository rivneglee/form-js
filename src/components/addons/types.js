/* @flow */
import type { ComponentType } from 'react';

export type ItemProps = {
  id: string,
  type?: string,
  width?: number,
  height?: number,
  x?: number,
  y?: number,
  onPropsChanged?: (item: ItemProps) => void,
};

export type DefaultProps = {
  initSize: {
    width: number,
    height: number,
  },
};

export type AddOn = {
  type: string,
  ToolboxView: ComponentType<any>,
  CanvasView: ComponentType<any>,
  defaultProps: DefaultProps,
};
