/* @flow */
import React from 'react';
import '../toolbox.scss';
import ScrollBar from '../../scrollbar';
import type { AddOn } from '../../addons';

type Props = {
  addons: Array<AddOn>,
};

class View extends React.Component<Props> {
  render() {
    const { addons } = this.props;
    return (
      <div className="toolbox">
        <ScrollBar>
          {addons.map(({ ToolboxView, type }) => (
            <div key={`addon_${type}`} className="toolbox__button">
              <ToolboxView type={type} />
            </div>
          ))}
        </ScrollBar>
      </div>
    );
  }
}

export default View;
