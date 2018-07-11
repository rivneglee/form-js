/* @flow */
import React, { Component } from 'react';
import ScrollBar from '../../scrollbar';
import { withDraggableWrapper, withResizerAndPositioner } from '../../../high-order';
import addOns from '../../addons';
import type { AddOn, ItemProps } from '../../addons';
import '../canvas.scss';

type Props = {
  items: Array<ItemProps>,
};

type State = {
  selectedItem: ?string,
};

const wrapAddonsView = (addons: Array<AddOn>) => {
  const map = {};
  addons.forEach((addon: AddOn) => {
    const { type, CanvasView } = addon;
    map[type] = withResizerAndPositioner(withDraggableWrapper('canvas_item', 0.1)(CanvasView));
  });
  return map;
};

const View = class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.addonViews = wrapAddonsView(addOns);
  }

  onSelectItem = (evt: SyntheticEvent<HTMLDivElement>, selectedItem: ?string) => {
    this.setState({
      selectedItem,
    });
    evt.stopPropagation();
  };

  addonViews: Object;

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;
    return (
      <div className="canvas" onMouseDown={evt => this.onSelectItem(evt, null)}>
        <ScrollBar>
          {items.map((item: ItemProps) => {
            const { id, type, ...rest } = item;
            if (!type || !id) return null;
            const ItemView = this.addonViews[type];
            const cssClass = selectedItem === id ? 'canvas__item--selected' : '';
            return (
              <div
                key={id}
                className={`canvas__item ${cssClass}`}
                onMouseDown={evt => this.onSelectItem(evt, id)}
              >
                <ItemView id={id} {...rest} />
              </div>
            );
          })}
        </ScrollBar>
      </div>
    );
  }
};

export default View;
