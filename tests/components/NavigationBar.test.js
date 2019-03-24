import React from 'react';
import { shallow } from 'enzyme';
import { NavigationBar } from '../../web/components/NavigationBar';

import NavLinkItem from '../../web/components/NavLinkItem';
import Text from '../../web/components/Text';

let renderedComponent;

let mock = () => jest.fn();

describe('NavigationBar Component', () => {
    beforeEach(() => {

        renderedComponent = shallow(
            <NavigationBar
            />
        );
    });

    it('should render correctly', () => {
        expect(renderedComponent).toMatchSnapshot();
    })

});