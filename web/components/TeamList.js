import React from 'react';
import { connect } from 'react-redux'

import TeamMember from './TeamMember'

import { fetchAllTeamMembers } from '../reducers/environment'

class TeamList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mockTeamMembers: ['Oscar Lafarga', 'Vitoria Lafarga', 'Quinn Pruit', 'David Lafarga']
        }
    }

    componentDidMount() {
        this.props.fetchAllTeamMembers()
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

const mapStateToProps = ({ environment }) => {
    return {
        ...environment
    };
};

const mapDispatchToProps = () => {
    return {
        fetchAllTeamMembers
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)