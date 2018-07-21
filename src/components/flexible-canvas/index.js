import { connect } from 'react-redux';
import View from './components/View';
import { withDroppableWrapper } from '../../high-order';
import { updateItemPropsActionCreator, selectItemActionCreator } from '../../actions';

const mapDispatchToProps = dispatch => ({
  updateItemProps: props => dispatch(updateItemPropsActionCreator(props)),
  onSelectedItemChanged: id => dispatch(selectItemActionCreator(id)),
});

const Canvas = connect(
  null,
  mapDispatchToProps,
)(withDroppableWrapper(['toolbox_item', 'canvas_item'])(View));

export default Canvas;
