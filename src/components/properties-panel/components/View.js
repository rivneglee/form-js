import React from 'react';
import ScrollBar from '../../scrollbar';
import '../properties-panel.scss';

const View = class extends React.Component {
  constructor(props) {
    super(props);
    const { onPropsChanged, item } = props;
    this.onPropsChanged = onPropsChanged.bind(this);
    this.state = {
      ...item,
    };
  }

  componentWillReceiveProps(props) {
    const { onPropsChanged, item } = props;
    this.onPropsChanged = onPropsChanged.bind(this);
    this.setState({
      ...item,
    });
  }

  onInput = (field, value) => {
    const { item } = this.props;
    const { id } = item;
    const newState = {};
    newState[field] = value;
    this.setState({
      ...newState,
    });
    this.onPropsChanged({
      id,
      ...newState,
    });
  };

  render() {
    const {
      x, y, width, height, deg,
    } = this.state;
    return (
      <div className="properties-panel">
        <ScrollBar>
          <div className="properties-panel__field-group">
            <div className="properties-panel__label">COORDINATES</div>
            <div>
              <span className="properties-panel__label properties-panel__label--minor">X</span>
              <input
                type="number"
                className="properties-panel__text-field properties-panel__text-field--short"
                onInput={evt => this.onInput('x', Number(evt.target.value))}
                value={x || 0}
              />
              <span className="properties-panel__label properties-panel__label--minor">Y</span>
              <input
                type="number"
                className="properties-panel__text-field properties-panel__text-field--short"
                onInput={evt => this.onInput('y', Number(evt.target.value))}
                value={y || 0}
              />
            </div>
          </div>
          <div className="properties-panel__field-group">
            <div className="properties-panel__label">SIZE</div>
            <div>
              <span className="properties-panel__label properties-panel__label--minor">W</span>
              <input
                type="number"
                className="properties-panel__text-field properties-panel__text-field--short"
                onInput={evt => this.onInput('width', Number(evt.target.value))}
                value={width || 0}
              />
              <span className="properties-panel__label properties-panel__label--minor">H</span>
              <input
                type="number"
                className="properties-panel__text-field properties-panel__text-field--short"
                onInput={evt => this.onInput('height', Number(evt.target.value))}
                value={height || 0}
              />
            </div>
          </div>
          <div className="properties-panel__field-group">
            <div className="properties-panel__label">ANGLE</div>
            <div>
              <input
                type="number"
                className="properties-panel__text-field"
                onInput={evt => this.onInput('deg', Number(evt.target.value))}
                value={deg || 0}
              />
            </div>
          </div>
        </ScrollBar>
      </div>
    );
  }
};

export default View;
