import React from 'react';
import { shallow } from 'enzyme';
import MainContent from 'components//MainContent.js';

describe('<MainContent />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<MainContent />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "maincontent-component"', () => {
      expect(component.hasClass('maincontent-component')).to.equal(true);
    });
  });
});
