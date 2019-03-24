import React from 'react';
import { shallow } from 'enzyme';
import { TeamList } from '../../web/components/TeamList';

let renderedComponent;
let MOCK_TEAM_MEMBERS = [
    {
        id: '00000001',
        name: 'Team Member #1'
    }
]

let mock = () => jest.fn();
let mockFetchAllTeamMembers

describe('TeamList Component', () => {
    beforeEach(() => {
        mockFetchAllTeamMembers = jest.fn().mockResolvedValue(MOCK_TEAM_MEMBERS)

        renderedComponent = shallow(
            <TeamList
                teamMembers={[]}
                fetchAllTeamMembers={mockFetchAllTeamMembers}
                // goToPage={mockedFunction}
                // goToEdit={mockedFunction}
            />
        );
    });

    it('should render correctly', () => {
        expect(renderedComponent).toMatchSnapshot();
    })

    it('should fetchAllTeamMembers only once', () => {
        expect(mockFetchAllTeamMembers.mock.calls.length).toBe(1)
    })

    it('fetchAllTeamMembers should resolve an array of team members', () => {
        mockFetchAllTeamMembers.mock.results[0].value.then(resolvedValue => {
            expect(resolvedValue).toBe(MOCK_TEAM_MEMBERS)
        })
    })
});