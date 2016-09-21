import React from 'react';
import { shallow } from 'enzyme';
import RandomCustomList from 'components//RandomCustomList.js';

describe('<RandomCustomList />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<RandomCustomList />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "randomcustomlist-component"', () => {
      expect(component.hasClass('randomcustomlist-component')).to.equal(true);
    });
  });
});
