import React from 'react';
import { shallow } from 'enzyme';
import RandomCustomContent from 'components//RandomCustomContent.js';

describe('<RandomCustomContent />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<RandomCustomContent />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "randomcustomcontent-component"', () => {
      expect(component.hasClass('randomcustomcontent-component')).to.equal(true);
    });
  });
});
