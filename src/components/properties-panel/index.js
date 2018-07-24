import { connect } from 'react-redux';
import View from './components/View';
import { updateItemsPropsActionCreator } from '../../actions';

const mapDispatchToProps = dispatch => ({
  onPropsChanged: props => dispatch(updateItemsPropsActionCreator([props])),
});

export default connect(
  null,
  mapDispatchToProps,
)(View);
