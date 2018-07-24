/* @flow */
import type { ItemProps } from '../components/addons';

export const ACTION_ADD_ITEM_TO_CANVAS = 'ADD_ITEM';
export const ACTION_UPDATE_ITEMS = 'UPDATE_ITEMS_PROPS';
export const ACTION_SELECTED_ITEM_CHANGED = 'SELECTED_ITEM_CHANGED';

export type Action = {
  type: string,
};

export type ItemSelectionAction = Action & {
  id: ?string,
};

export type UpdateItemsAction = Action & {
  data: {
    canvasId?: string,
    items: Array<ItemProps>,
  },
};

export const selectItemActionCreator = (id: string): Action => ({
  type: ACTION_SELECTED_ITEM_CHANGED,
  id,
});

export const addItemToCanvasActionCreator = (
  canvasId: string,
  props: ItemProps,
): UpdateItemsAction => ({
  type: ACTION_ADD_ITEM_TO_CANVAS,
  data: {
    canvasId,
    items: [props],
  },
});

export const updateItemsPropsActionCreator = (items: Array<ItemProps>): UpdateItemsAction => ({
  type: ACTION_UPDATE_ITEMS,
  data: {
    items,
  },
});
