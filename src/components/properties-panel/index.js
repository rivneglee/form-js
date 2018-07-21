import { connect } from 'react-redux';
import View from './components/View';
import { updateItemPropsActionCreator } from '../../actions';

const mapDispatchToProps = dispatch => ({
  onPropsChanged: props => dispatch(updateItemPropsActionCreator(props)),
});

export default connect(
  null,
  mapDispatchToProps,
)(View);
