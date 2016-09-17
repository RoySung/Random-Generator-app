import React from 'react';
import { shallow } from 'enzyme';
import RandomNumberContent from 'components//RandomNumberContent.js';

describe('<RandomNumberContent />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<RandomNumberContent />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "randomnumbercontent-component"', () => {
      expect(component.hasClass('randomnumbercontent-component')).to.equal(true);
    });
  });
});
