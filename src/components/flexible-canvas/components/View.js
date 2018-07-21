/* @flow */
import React, { Component } from 'react';
import ScrollBar from '../../scrollbar';
import type { AddOn, ItemProps } from '../../addons';
import createAddonsView from '../createAddonsView';
import '../canvas.scss';

type Props = {
  id: string,
  addons: Array<AddOn>,
  items: Array<ItemProps>,
  onSelectedItemChanged?: (selectedItem: ?string) => void,
  updateItemProps?: (item: ItemProps) => void,
};

type State = {
  selectedItem: ?string,
};

const View = class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { addons } = props;
    this.state = {
      selectedItem: null,
    };
    this.addonViews = createAddonsView(addons);
  }

  onSelectedItemChanged = (evt: SyntheticEvent<HTMLDivElement>, selectedItem: ?string) => {
    const { onSelectedItemChanged } = this.props;
    this.setState({
      selectedItem,
    });
    if (onSelectedItemChanged) {
      onSelectedItemChanged(selectedItem);
    }
    evt.stopPropagation();
  };

  onMoveItem = (x: number, y: number) => {
    const { selectedItem } = this.state;
    const { updateItemProps } = this.props;
    if (selectedItem && updateItemProps) {
      updateItemProps({ id: selectedItem, x, y });
    }
  };

  onResizeItem = (width: number, height: number) => {
    const { selectedItem } = this.state;
    const { updateItemProps } = this.props;
    if (selectedItem && updateItemProps) {
      updateItemProps({ id: selectedItem, width, height });
    }
  };

  addonViews: Object;

  render() {
    const { selectedItem } = this.state;
    const { items, id } = this.props;
    return (
      <div id={id} className="canvas" onMouseDown={evt => this.onSelectedItemChanged(evt, null)}>
        <ScrollBar>
          {items.map((item: ItemProps) => {
            const { type, ...rest } = item;
            if (!type || !item.id) return null;
            const ItemView = this.addonViews[type];
            const cssClass = selectedItem === item.id ? 'canvas__item--selected' : '';
            return (
              <div
                key={item.id}
                className={`canvas__item ${cssClass}`}
                onMouseDown={evt => this.onSelectedItemChanged(evt, item.id)}
              >
                <ItemView
                  id={item.id}
                  onMove={this.onMoveItem}
                  onResize={this.onResizeItem}
                  {...rest}
                />
              </div>
            );
          })}
        </ScrollBar>
      </div>
    );
  }
};

export default View;
