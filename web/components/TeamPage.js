import React from 'react';

import TeamList from './TeamList';
import TeamLogo from './TeamLogo';
import Header from './Header';
import Flex from './Flex';


export default class TeamPage extends React.Component {

    goToPage = (teamMember) => {
        const { history } = this.props;
        history.push('/team/' + teamMember.id + '/1');
    }

    render() {

        return (
            <Flex
                column
                className='TeamPage'
                bg='white'
                width='100%'
            >
                <Header />

                <TeamLogo />

                <TeamList goToPage={this.goToPage} />
            </Flex>
        );
    }
}
