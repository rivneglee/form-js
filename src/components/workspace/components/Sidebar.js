import React from 'react';
import Toolbox from '../../toolbox';
import PropertiesPanel from '../../properties-panel';
import addOns from '../../addons';

const Sidebar = ({ selectedItem }) => (
  <div className="project-workspace__sidebar">
    <div
      className={
        selectedItem
          ? 'project-workspace__toolbox project-workspace__toolbox--collapse'
          : 'project-workspace__toolbox project-workspace__toolbox--expand'
      }
    >
      <Toolbox addons={addOns} />
    </div>
    <div
      className={
        selectedItem
          ? 'project-workspace__properties-panel project-workspace__properties-panel--expand'
          : 'project-workspace__properties-panel project-workspace__properties-panel--collapse'
      }
    >
      <PropertiesPanel item={selectedItem} />
    </div>
  </div>
);

export default Sidebar;
