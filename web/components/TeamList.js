import React from 'react';
import { connect } from 'react-redux'

import TeamMember from './TeamMember'

import { fetchAllTeamMembers } from '../reducers/environment'

class TeamList extends React.Component {

    componentDidMount() {
        this.props.fetchAllTeamMembers()
    }

    generateColor () {
        return '#' + Math.random().toString(16).substr(-6);
    }

    render() {
        const { teamMembers, goToPage } = this.props;
        return (
            <>
                {teamMembers.map(teamMember => {
                    return (
                        <TeamMember
                            key={teamMember.id}
                            name={teamMember.name}
                            goToPage={() => { goToPage(teamMember) }}
                            color={this.generateColor()}
                        />
                    )
                })
                }
            </>
        )
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        ...environment
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTeamMembers: () => dispatch(fetchAllTeamMembers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)