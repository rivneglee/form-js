import React from 'react';
import Canvas from '../../flexible-canvas';
import { generateId } from '../../../utils';
import addons from '../../addons';

export default class extends React.Component<*> {
  constructor(props: ?Object) {
    super(props);
    this.id = generateId();
    this.state = {
      items: [],
    };
  }

  onDrop = ({ position }, { type }, dropTarget) => {
    if (dropTarget !== 'toolbox_item') return;
    const addon = addons.find(a => a.type === type);
    if (addon) {
      const { onAddItem } = this.props;
      const { defaultProps } = addon;
      const { initSize, ...otherProps } = defaultProps;
      const { width, height } = initSize;
      const x = Math.round(position.x - width / 2);
      const y = Math.round(position.y - height / 2);
      const item = {
        id: generateId(),
        type,
        x,
        y,
        width,
        height,
        ...otherProps,
      };
      const { items } = this.state;
      this.setState({
        items: [...items, item],
      });
      if (onAddItem) {
        onAddItem(this.id, item);
      }
    }
  };

  id: string;

  render() {
    const { items } = this.state;
    return (
      <div className="project-workspace__content">
        <Canvas onDrop={this.onDrop} id={this.id} items={items} addons={addons} />
      </div>
    );
  }
}
