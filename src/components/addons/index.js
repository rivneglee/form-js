/* @flow */
import type { AddOn } from './types';
import text from './text';
import image from './image';
import list from './checkbox-list';
import input from './text-input';
import attachment from './attachment';
import toggle from './toggle';
import table from './table';

const addons: Array<AddOn> = [text, image, list, input, attachment, toggle, table];

export type { AddOn, DefaultProps, ItemProps } from './types';
export default addons;
