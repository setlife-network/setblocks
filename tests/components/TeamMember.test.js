import React from 'react';
import { shallow } from 'enzyme';
import TeamMember from '../../web/components/TeamMember';

let renderedComponent;
let MOCK_TEAM_MEMBER = {
    id: '00000001',
    name: 'Team Member #1'
}

let mock = () => jest.fn();

describe('TeamMember Component', () => {
    beforeEach(() => {

        renderedComponent = shallow(
            <TeamList
                name={MOCK_TEAM_MEMBER.name}
            />
        );
    });

    it('should render correctly', () => {
        expect(renderedComponent).toMatchSnapshot();
    })

});