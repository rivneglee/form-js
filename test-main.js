import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

var srcDir = require.context('./src/', true, /-spec\.js$/);

srcDir.keys().forEach(srcDir);
