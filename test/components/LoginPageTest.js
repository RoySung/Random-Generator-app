import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from 'components//LoginPage.js';

describe('<LoginPage />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<LoginPage />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "loginpage-component"', () => {
      expect(component.hasClass('loginpage-component')).to.equal(true);
    });
  });
});
