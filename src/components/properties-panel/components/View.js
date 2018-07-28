import React from 'react';
import ScrollBar from '../../scrollbar';
import '../properties-panel.scss';
import General from './GeneralOptions';

const View = class extends React.Component {
  constructor(props) {
    super(props);
    const { item } = props;
    this.state = {
      ...item,
    };
  }

  componentWillReceiveProps(props) {
    const { item } = props;
    this.setState({
      ...item,
    });
  }

  onPropsChanged = (propName, value) => {
    const { onPropsChanged, item } = this.props;
    const { id } = item;
    const newState = {};
    newState[propName] = value;
    this.setState({
      ...newState,
    });

    if (onPropsChanged) {
      onPropsChanged({
        id,
        ...newState,
      });
    }
  };

  render() {
    return (
      <div className="properties-panel">
        <ScrollBar>
          <div className="properties-panel__section">
            <div className="properties-panel__section__title">
              <span>GENERAL</span><span className="properties-panel__section__toggle properties-panel__section__toggle--collapsed" />
            </div>
            <General {...this.state} onPropsChanged={this.onPropsChanged} />
          </div>
        </ScrollBar>
      </div>
    );
  }
};

export default View;
