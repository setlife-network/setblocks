import React from 'react';
import { connect } from 'react-redux'

import TeamMember from './TeamMember'

import { fetchAllTeamMembers } from '../ducks/team'

export class TeamList extends React.Component {

    componentDidMount() {
        this.props.fetchAllTeamMembers()
        .then(membersExist => {
            
        })
    }

    generateColor () {
        return '#' + Math.random().toString(16).substr(-6);
    }

    render() {
        const { teamMembers, goToPage, goToEdit } = this.props;
        return (
            <>
                {teamMembers.map((teamMember, index) => {
                    return (
                        <TeamMember
                            key={teamMember.id}
                            index={index}
                            name={teamMember.name}
                            goToPage={() => { goToPage(teamMember) }}
                            goToEdit={() => { goToEdit(teamMember) }}
                            color={this.generateColor()}
                        />
                    )
                })
                }
            </>
        )
    }
}

const mapStateToProps = ({ team }) => {
    return {
        ...team
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTeamMembers: () => dispatch(fetchAllTeamMembers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)