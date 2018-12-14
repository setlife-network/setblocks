import React from 'react';

import TeamMember from './TeamMember'

export default class TeamList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mockTeamMembers: ['Oscar Lafarga', 'Vitoria Lafarga', 'Quinn Pruit', 'David Lafarga']
        }
    }

    goToPage = () => {
        console.log('goToTeamMember')
    };


    render() {
        const { mockTeamMembers } = this.state;
        return (
            <>
                <TeamMember
                    name={mockTeamMembers[0]}
                    goToPage={this.goToPage}
                    color='red'
                />
                <TeamMember
                    name={mockTeamMembers[1]}
                    goToPage={this.goToPage}
                    color='blue'
                />
                <TeamMember
                    name={mockTeamMembers[2]}
                    goToPage={this.goToPage}
                    color='purple'
                />
                <TeamMember
                    name={mockTeamMembers[3]}
                    goToPage={this.goToPage}
                    color='green'
                />
            </>
        )
    }
}