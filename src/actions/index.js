/* @flow */
import type { ItemProps } from '../components/addons';

export const ACTION_ADD_ITEM_TO_CANVAS = 'ADD_ITEM';
export const ACTION_UPDATE_ITEM_PROPS = 'UPDATE_ITEM_PROPS';
export const ACTION_SELECTED_ITEM_CHANGED = 'SELECTED_ITEM_CHANGED';

export type Action = {
  type: string,
};

export type ItemSelectionAction = Action & {
  id: ?string,
};

export type ItemAction = Action & {
  data: {
    canvasId?: string,
    itemProps: ItemProps,
  },
};

export const selectItemActionCreator = (id: string): Action => ({
  type: ACTION_SELECTED_ITEM_CHANGED,
  id,
});

export const addItemToCanvasActionCreator = (canvasId: string, props: ItemProps): ItemAction => ({
  type: ACTION_ADD_ITEM_TO_CANVAS,
  data: {
    canvasId,
    itemProps: {
      ...props,
    },
  },
});

export const updateItemPropsActionCreator = (props: ItemProps): ItemAction => ({
  type: ACTION_UPDATE_ITEM_PROPS,
  data: {
    itemProps: {
      ...props,
    },
  },
});
