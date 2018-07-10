/* @flow */

import {
  ACTION_DESELECT_ITEM,
  ACTION_SELECT_ITEM,
  ACTION_ADD_ITEM_TO_CANVAS,
  ACTION_UPDATE_ITEM_PROPS,
} from '../actions';

import type { ItemSelectionAction, ItemAction, ItemProps } from '../actions';

export const selectedItemReducer = (
  state: ?string = null,
  action: ItemSelectionAction,
): ?string => {
  const { type } = action;
  switch (type) {
    case ACTION_DESELECT_ITEM:
    case ACTION_SELECT_ITEM: {
      const { id } = action;
      if (state !== id) {
        return id;
      }
      return state;
    }
    default:
      return state;
  }
};

export const itemsReducer = (state: Object = {}, action: ItemAction): ItemProps => {
  const { type, data } = action;
  switch (type) {
    case ACTION_ADD_ITEM_TO_CANVAS:
    case ACTION_UPDATE_ITEM_PROPS: {
      const items = {
        ...state,
      };
      const { itemProps } = data;
      const { id } = itemProps;
      items[id] = {
        ...items[id],
        ...itemProps,
      };
      return items;
    }
    default:
      return state;
  }
};
