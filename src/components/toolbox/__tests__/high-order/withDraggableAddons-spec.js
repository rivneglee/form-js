import React from 'react';
import { mount } from 'enzyme';
import { within } from '../../../../utils/test-helper/rewire';
import withDraggableAddons from '../../high-order/withDraggableAddons';
import { DND_GROUP } from '../../constants';

describe('withDraggableAddons', () => {
  let wrapper;

  const View = props => <div {...props} />;

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
  const Wrapper = () => <div />;

  const hoc = jasmine.createSpy('hoc').and.callFake(() => Wrapper);
  const withDraggableWrapper = jasmine.createSpy('withDraggableWrapper').and.returnValue(hoc);

  const addons = [{ type: 'text', ToolboxView: Text }, { type: 'image', ToolboxView: Image }];

  const wrappedAddons = [
    { type: 'text', ToolboxView: Wrapper },
    { type: 'image', ToolboxView: Wrapper },
  ];

  const stub = within(withDraggableAddons);

  beforeAll(() => {
    stub.replace('withDraggableWrapper').with(withDraggableWrapper);
    const ComposedView = withDraggableAddons(View);
    wrapper = mount(<ComposedView addons={addons} />);
  });

  afterAll(() => {
    stub.reset();
  });

  it('addons should be wrapped', () => {
    expect(wrapper.find(View).props().addons).toEqual(wrappedAddons);
  });

  it('HOC withDraggableWrapper should be called with correct params', () => {
    expect(withDraggableWrapper).toHaveBeenCalledWith(DND_GROUP);
    expect(withDraggableWrapper).toHaveBeenCalledWith(DND_GROUP);
  });
});
