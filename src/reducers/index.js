/* @flow */

import {
  ACTION_SELECTED_ITEM_CHANGED,
  ACTION_ADD_ITEM_TO_CANVAS,
  ACTION_UPDATE_ITEMS,
} from '../actions';

import type { ItemSelectionAction, UpdateItemsAction } from '../actions';
import type { ItemProps } from '../components/addons';

export const selectedItemReducer = (
  state: ?string = null,
  action: ItemSelectionAction,
): ?string => {
  const { type } = action;
  switch (type) {
    case ACTION_SELECTED_ITEM_CHANGED: {
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

export const itemsReducer = (state: Object = {}, action: UpdateItemsAction): ItemProps => {
  const { type, data } = action;
  switch (type) {
    case ACTION_ADD_ITEM_TO_CANVAS:
    case ACTION_UPDATE_ITEMS: {
      const { items } = data;
      const results = {
        ...state,
      };
      items.forEach((item) => {
        const { id } = item;
        results[id] = {
          ...results[id],
          ...item,
        };
      });
      return results;
    }
    default:
      return state;
  }
};
