import React from 'react';

export default ({
  onPropsChanged,
  name,
  x,
  y,
  height,
  width,
  deg,
}) => (
  <div className="properties-panel__section__options">
    <div className="properties-panel__field-group">
      <div className="properties-panel__label">NAME</div>
      <div>
        <input
          className="properties-panel__text-field"
          onInput={evt => onPropsChanged('name', evt.target.value)}
          value={name || ''}
        />
      </div>
    </div>
    <div className="properties-panel__field-group">
      <div className="properties-panel__label">COORDINATES</div>
      <div>
        <span className="properties-panel__label properties-panel__label--minor">X</span>
        <input
          type="number"
          className="properties-panel__text-field properties-panel__text-field--short"
          onInput={evt => onPropsChanged('x', Number(evt.target.value))}
          value={x || 0}
        />
        <span className="properties-panel__label properties-panel__label--minor">Y</span>
        <input
          type="number"
          className="properties-panel__text-field properties-panel__text-field--short"
          onInput={evt => onPropsChanged('y', Number(evt.target.value))}
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
          onInput={evt => onPropsChanged('width', Number(evt.target.value))}
          value={width || 0}
        />
        <span className="properties-panel__label properties-panel__label--minor">H</span>
        <input
          type="number"
          className="properties-panel__text-field properties-panel__text-field--short"
          onInput={evt => onPropsChanged('height', Number(evt.target.value))}
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
          onInput={evt => onPropsChanged('deg', Number(evt.target.value))}
          value={deg || 0}
        />
      </div>
    </div>
  </div>
);
