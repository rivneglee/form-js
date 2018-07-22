import React from 'react';
import '../style.scss';
import type { ItemProps } from '../../types';
import CheckboxList from './CheckboxList';
import ListLabel from '../../../editable-content';

type OtherProps = {};

type State = {};

export default class extends React.Component<ItemProps & OtherProps, State> {
  render() {
    const {
      id, width, height, onPropsChanged, options, label,
    } = this.props;
    return (
      <div
        className="addon-checkbox-list"
        id={id}
        style={{
          width,
          height,
        }}
      >
        <div className="addon-checkbox-list__label">
          <ListLabel id={id} content={label} onPropsChanged={onPropsChanged} />
        </div>
        <div className="addon-checkbox-list__content">
          <CheckboxList id={id} onPropsChanged={onPropsChanged} options={options} />
        </div>
      </div>
    );
  }
}
