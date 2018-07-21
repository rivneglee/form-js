import React from 'react';
import { mount } from 'enzyme';
import Toolbox from '../../components/View';

describe('Toolbox View', () => {
  let wrapper;

  const Text = props => (
    <div className="addon__text" {...props}>
      Text
    </div>
  );
  const Image = props => (
    <div className="addon__image" {...props}>
      Image
    </div>
  );

  const addons = [{ type: 'text', ToolboxView: Text }, { type: 'image', ToolboxView: Image }];

  beforeAll(() => {
    wrapper = mount(<Toolbox addons={addons} />);
  });

  it('should has text addon', () => {
    expect(wrapper.find(Text).length).toBe(1);
  });

  it('should has image addon', () => {
    expect(wrapper.find(Image).length).toBe(1);
  });
});
