/* @flow */
import React, { Component } from 'react';
import { SelectableGroup } from 'react-selectable-fast';
import ScrollBar from '../../scrollbar';
import type { AddOn, ItemProps } from '../../addons';
import createAddonsView from '../createAddonsView';
import '../styles/canvas.scss';

type Props = {
  id: string,
  addons: Array<AddOn>,
  items: Array<ItemProps>,
  onSelectedItemChanged?: (selectedItem: ?string) => void,
  onItemsPropsUpdated?: (items: Array<ItemProps>) => void,
};

type State = {
  selectedItems: Array<string>,
  dragSelectionEnabled: boolean,
  items: Array<ItemProps>,
};

type SelectableItemType = {
  props: ItemProps,
};

type SelectableGroupType = {
  clearSelection: () => void,
};

const View = class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { addons, items } = props;
    this.state = {
      selectedItems: [],
      dragSelectionEnabled: true,
      items,
    };
    this.addonViews = createAddonsView(addons);
    this.selectingItems = [];
  }

  componentWillReceiveProps(props: Props) {
    const { items } = props;
    this.setState({
      items,
    });
  }

  onSelectionFinish = () => {
    if (this.selectingItems.length > 0) {
      const { onSelectedItemChanged } = this.props;
      this.setState({
        selectedItems: this.selectingItems,
        dragSelectionEnabled: false,
      });
      if (onSelectedItemChanged) {
        onSelectedItemChanged(this.selectingItems[this.selectingItems.length - 1]);
      }
    }
    this.selectingItems = [];
    this.blurActiveElement();
  };

  onDeselectItem = (evt: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onSelectedItemChanged } = this.props;
    this.clearSelections();
    if (onSelectedItemChanged) {
      onSelectedItemChanged(null);
    }
    evt.stopPropagation();
  };

  onSelectItem = (evt: SyntheticMouseEvent<HTMLDivElement>, itemId: string) => {
    const { selectedItems } = this.state;
    const { onSelectedItemChanged } = this.props;
    if (selectedItems.indexOf(itemId) === -1) {
      if (evt.shiftKey) {
        this.setState({
          selectedItems: [...selectedItems, itemId],
        });
      } else {
        this.setState({
          selectedItems: [itemId],
        });
      }
      if (onSelectedItemChanged) {
        onSelectedItemChanged(itemId);
      }
    }
    evt.stopPropagation();
  };

  onMoveItem = (x: number, y: number, deltaX: number, deltaY: number) => {
    const { selectedItems } = this.state;
    const { items } = this.props;
    this.updateItems(
      items.filter(i => selectedItems.indexOf(i.id) !== -1).map(item => ({
        id: item.id,
        x: item.x + deltaX,
        y: item.y + deltaY,
      })),
    );
  };

  onResizeItem = (width: number, height: number) => {
    const { selectedItems } = this.state;
    if (selectedItems.length === 1) {
      this.updateItemProps({ id: selectedItems[0], width, height });
    }
  };

  onRotate = (deg: number) => {
    const { selectedItems } = this.state;
    if (selectedItems.length === 1) {
      this.updateItemProps({ id: selectedItems[0], deg });
    }
  };

  setSelectableRef = (ref: ?SelectableGroupType) => {
    this.selectable = ref;
  };

  blurActiveElement = () => {
    if (document && document.activeElement) {
      document.activeElement.blur();
    }
  };

  toggleDragSelection = (dragSelectionEnabled: boolean) => {
    this.setState({
      dragSelectionEnabled,
    });
  };

  updateItems = (updatedItems: Array<ItemProps>) => {
    const { onItemsPropsUpdated, items } = this.props;
    updatedItems.forEach(({ id, ...rest }) => {
      const index = items.findIndex(i => i.id === id);
      if (index >= 0) {
        items[index] = {
          ...items[index],
          ...rest,
        };
      }
    });
    this.setState({
      items,
    });
    if (onItemsPropsUpdated) {
      onItemsPropsUpdated(updatedItems);
    }
  };

  updateItemProps = (item: ItemProps) => {
    this.updateItems([item]);
  };

  clearSelections = () => {
    if (this.selectable) {
      this.selectable.clearSelection();
    }
    this.selectingItems = [];
    this.setState({
      selectedItems: [],
    });
  };

  duringSelection = (selectings: Array<SelectableItemType>) => {
    this.selectingItems = selectings.map(({ props }) => props.id);
  };

  addonViews: Object;

  selectable: ?SelectableGroupType;

  selectingItems: Array<string>;

  render() {
    const { selectedItems, dragSelectionEnabled, items } = this.state;
    const { id } = this.props;
    return (
      <SelectableGroup
        ref={this.setSelectableRef}
        className="selectable-area"
        disabled={!dragSelectionEnabled}
        onSelectionFinish={this.onSelectionFinish}
        duringSelection={this.duringSelection}
      >
        <div id={id} className="canvas" onMouseDown={this.onDeselectItem}>
          <ScrollBar>
            {items.map((item: ItemProps) => {
              const { type, ...rest } = item;
              if (!type || !item.id) return null;
              const ItemView = this.addonViews[type];
              const disableResizing = selectedItems.length > 1;
              const isSelected = selectedItems.indexOf(item.id) !== -1;
              const cssClass = selectedItems.indexOf(item.id) !== -1 ? 'canvas__item--selected' : '';
              return (
                <div
                  key={item.id}
                  className={`canvas__item ${cssClass}`}
                  onMouseDown={evt => this.onSelectItem(evt, item.id)}
                  onMouseEnter={() => this.toggleDragSelection(false)}
                  onMouseLeave={() => this.toggleDragSelection(true)}
                >
                  <ItemView
                    id={item.id}
                    isSelected={isSelected}
                    onMove={this.onMoveItem}
                    onResize={this.onResizeItem}
                    onRotate={this.onRotate}
                    disableResizing={disableResizing}
                    onPropsChanged={this.updateItemProps}
                    {...rest}
                  />
                </div>
              );
            })}
          </ScrollBar>
        </div>
      </SelectableGroup>
    );
  }
};

export default View;
