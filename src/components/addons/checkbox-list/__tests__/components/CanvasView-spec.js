import React from 'react';
import { shallow } from 'enzyme';
import CanvasView from '../../components/CanvasView';
import CheckboxList from '../../components/CheckboxList';
import ListLabel from '../../../../editable-content';

describe('Checkbox list canvas view', () => {
  const options = ['option A', 'option B', 'option C'];
  const onPropsChanged = jasmine.createSpy();
  const id = 'foo_id';
  const label = 'foo_label';
  describe('render', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<CanvasView id={id} options={options} onPropsChanged={onPropsChanged} label={label}/>);
    });

    it('CheckboxList should be rendered', () => {
      expect(wrapper.find(CheckboxList).props()).toEqual({
        id,
        onPropsChanged,
        options,
      });
    });

    it('ListLabel should be rendered', () => {
      expect(wrapper.find(ListLabel).props()).toEqual({
        id,
        onPropsChanged,
        content: label,
      });
    });
  });
});