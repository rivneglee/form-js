import { connect } from 'react-redux';
import View from './components/View';
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

const Canvas = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withDroppableWrapper(['toolbox_item', 'canvas_item'])(View));

export default Canvas;
