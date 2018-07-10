/* @flow */
export const ACTION_ADD_ITEM_TO_CANVAS = 'ADD_ITEM';
export const ACTION_UPDATE_ITEM_PROPS = 'UPDATE_ITEM_PROPS';
export const ACTION_SELECT_ITEM = 'SELECT_ITEM';
export const ACTION_DESELECT_ITEM = 'DESELECT_ITEM';

export type ItemProps = {
  id: string,
  type?: string,
  width?: number,
  height?: number,
  x?: number,
  y?: number,
};

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
  type: ACTION_SELECT_ITEM,
  id,
});

export const deselectItemActionCreator = (): Action => ({
  type: ACTION_DESELECT_ITEM,
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
