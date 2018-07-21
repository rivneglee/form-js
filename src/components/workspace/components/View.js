/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import '../workspace.scss';
import Content from './Content';
import Sidebar from './Sidebar';
import { addItemToCanvasActionCreator } from '../../../actions';

type Props = {};

type State = {};

const mapDispatchToProps = dispatch => ({
  onAddItem: (canvasId, item) => dispatch(addItemToCanvasActionCreator(canvasId, item)),
});

const mapStateToProps = ({ selectedItem, items }) => ({ selectedItem: items[selectedItem] });

const ContentSection = connect(
  null,
  mapDispatchToProps,
)(Content);
const SidebarSection = connect(mapStateToProps)(Sidebar);

export default class Workspace extends React.Component<Props, State> {
  render() {
    return (
      <div className="project-workspace">
        <SidebarSection />
        <ContentSection />
      </div>
    );
  }
}
