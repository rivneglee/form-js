import { connect } from 'react-redux';
import View from '../flexible-canvas';
import { withDroppableWrapper } from '../../high-order';

import {
  updateItemsPropsActionCreator,
  selectItemActionCreator,
} from '../../actions';

const mapDispatchToProps = dispatch => ({
  onItemsPropsUpdated: items => dispatch(updateItemsPropsActionCreator(items)),
  onSelectedItemChanged: id => dispatch(selectItemActionCreator(id)),
});

const mapStateToProps = ({ items }) => ({
  items: Object.values(items),
});

export default () => connect(
  mapStateToProps,
  mapDispatchToProps,
)(withDroppableWrapper(['toolbox_item'])(View));
