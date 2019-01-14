import React from 'react';

import TeamList from './TeamList';
import Header from './Header';
import Flex from './Flex';
import Text from './Text';


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
                bg='primary'
                width='100%'
            >
                <Header />

                <Text align='center' size='2rem' my='0.5rem' weight='900'>
                    {'Team'}
                </Text>

                <TeamList goToPage={this.goToPage} />
            </Flex>
        );
    }
}
