import React from 'react';
import { mount } from 'enzyme';
import { Editor } from 'react-draft-wysiwyg';
import CheckboxList from '../../components/CheckboxList';

describe('CheckboxList', () => {
  const options = ['option A', 'option B', 'option C'];
  describe('render', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<CheckboxList options={options} />);
    });

    it('option line should be rendered', () => {
      expect(wrapper.find('.addon-checkbox-list__option').length).toBe(3);
    });

    it('checkbox should be rendered', () => {
      expect(wrapper.find('input').length).toBe(3);
    });

    it('option label should be rendered', () => {
      options.forEach((text, i) => {
        expect(wrapper.find('.addon-checkbox-list__option').at(i).text()).toBe(text);
      });
    });
  });

  describe('editing', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<CheckboxList options={options} />);
    });

    describe('enabled', () => {
      beforeAll((done) => {
        wrapper.setState({
          enableEditing: true,
        }, () => done());
      });

      it('option label should not be rendered at all', () => {
        expect(wrapper.find('.addon-checkbox-list__option').length).toBe(0);
      });

      it('editor should be rendered', () => {
        expect(wrapper.find(Editor).length).toBe(1);
      });
    });
  });
});
