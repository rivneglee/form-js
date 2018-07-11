/* @flow */
import type { AddOn } from './types';
import text from './text';
import image from './image';

const addons: Array<AddOn> = [text, image];

export type { AddOn, DefaultProps, ItemProps } from './types';
export default addons;
