import React from 'react';
import { mount } from 'enzyme';
import { within } from '../../../../utils/test-helper/rewire';
import Canvas from '../../components/View';
import { items } from '../../__fixtures__';

describe('Canvas View', () => {
  let wrapper;

  const Text = props => (<div className="item__text" {...props}>Text</div>);
  const Image = props => (<div className="item__image" {...props}>Image</div>);

  const CanvasStub = within(Canvas);

  const withDraggableWrapperMock = jasmine.createSpy().and.returnValue(C => C);

  const addOnsMock = [
    { type: 'text', CanvasView: Text },
    { type: 'image', CanvasView: Image },
  ];

  beforeAll(() => {
    CanvasStub
      .replace('addOns')
      .with(addOnsMock)
      .replace('withDraggableWrapper')
      .with(withDraggableWrapperMock)
      .replace('withResizerAndPositioner');
    wrapper = mount(<Canvas items={items} />);
  });

  afterAll(() => {
    CanvasStub.reset();
  });

  describe('render', () => {
    it('renders 2 <Text/> components', () => {
      expect(wrapper.find(Text).length).toBe(2);
    });

    it('renders <Text/> component with right props', () => {
      const { id, x, y } = items[1];
      expect(wrapper.find(Text).at(0).props()).toEqual(
        {
          id,
          x,
          y,
          width: '100%',
          height: '100%',
        },
      );
    });

    it('renders 2 <Image/> components', () => {
      expect(wrapper.find(Image).length).toBe(2);
    });

    it('renders <Image/> component with right props', () => {
      const { id, x, y } = items[0];
      expect(wrapper.find(Image).at(0).props()).toEqual(
        {
          id,
          x,
          y,
          width: '100%',
          height: '100%',
        },
      );
    });

    it('HOC withDraggableWrapper should be called with correct params', () => {
      expect(withDraggableWrapperMock).toHaveBeenCalledWith('canvas_item', 0.1);
    });
  });

  describe('click item', () => {
    const itemId = items[0].id;
    let item;

    beforeAll(() => {
      item = wrapper.find('.canvas__item').at(0);
      item.simulate('mousedown');
    });

    it('state `selectedItem` should be set to item id ', () => {
      expect(wrapper.state('selectedItem')).toBe(itemId);
    });

    it('item should highlight', () => {
      expect(wrapper.find('.canvas__item--selected').length).toBe(1);
    });
  });

  describe('click canvas', () => {
    let canvas;

    beforeAll(() => {
      canvas = wrapper.find('.canvas');
      canvas.simulate('mousedown');
    });

    it('state `selectedItem` should be set to null', () => {
      expect(wrapper.state('selectedItem')).toBe(null);
    });

    it('no item should highlight', () => {
      expect(wrapper.find('.canvas__item--selected').length).toBe(0);
    });
  });
});
