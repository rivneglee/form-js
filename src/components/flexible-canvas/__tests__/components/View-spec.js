import React from 'react';
import { mount } from 'enzyme';
import { within } from '../../../../utils/test-helper/rewire';
import Canvas from '../../components/View';
import createAddonsView from '../../createAddonsView';
import { items } from '../../__fixtures__';

describe('Canvas View', () => {
  let wrapper;

  const Text = props => (
    <div className="item__text" {...props}>
      Text
    </div>
  );
  const Image = props => (
    <div className="item__image" {...props}>
      Image
    </div>
  );

  const stub = within(createAddonsView);

  // const withDraggableWrapperMock = jasmine.createSpy().and.returnValue(C => C);

  const connectMock = jasmine.createSpy().and.returnValue(C => C);

  const addons = [{ type: 'text', CanvasView: Text }, { type: 'image', CanvasView: Image }];

  beforeAll(() => {
    stub
      // .replace('withDraggableWrapper')
      // .with(withDraggableWrapperMock)
      .replace('connect')
      .with(connectMock);
    wrapper = mount(<Canvas id="foo_canvas" items={items} addons={addons} />);
  });

  afterAll(() => {
    stub.reset();
  });

  describe('render', () => {
    it('renders 2 <Text/> components', () => {
      expect(wrapper.find(Text).length).toBe(2);
    });

    it('renders <Text/> component with right props', () => {
      const { id, x, y } = items[1];
      expect(
        wrapper
          .find(Text)
          .at(0)
          .props(),
      ).toEqual(
        jasmine.objectContaining({
          id,
          x,
          y,
          width: '100%',
          height: '100%',
        }),
      );
    });

    it('renders 2 <Image/> components', () => {
      expect(wrapper.find(Image).length).toBe(2);
    });

    it('renders <Image/> component with right props', () => {
      const { id, x, y } = items[0];
      expect(
        wrapper
          .find(Image)
          .at(0)
          .props(),
      ).toEqual(
        jasmine.objectContaining({
          id,
          x,
          y,
          width: '100%',
          height: '100%',
        }),
      );
    });

    // it('HOC withDraggableWrapper should be called with correct params', () => {
    //   expect(withDraggableWrapperMock).toHaveBeenCalledWith('canvas_item', 0.1);
    // });
  });

  describe('click item', () => {
    let item;
    const itemId = items[0].id;

    beforeAll(() => {
      item = wrapper.find('.canvas__item').at(0);
      item.simulate('mousedown');
    });

    it('state `selectedItem` should be set to item id ', () => {
      expect(wrapper.state('selectedItems').indexOf(itemId)).toBe(0);
    });

    it('item should highlight', () => {
      expect(wrapper.find('.selected').length).toBe(1);
    });
  });

  describe('click canvas', () => {
    let canvas;

    beforeAll(() => {
      canvas = wrapper.find('.canvas');
      canvas.simulate('mousedown');
    });

    it('state `selectedItem` should be set to null', () => {
      expect(wrapper.state('selectedItems').length).toBe(0);
    });

    it('no item should highlight', () => {
      expect(wrapper.find('.canvas__item--selected').length).toBe(0);
    });
  });
});
