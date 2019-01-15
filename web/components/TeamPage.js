import React from 'react';
import moment from 'moment';

import TeamList from './TeamList';
import Header from './Header';
import Flex from './Flex';
import Text from './Text';
import Loading from './Loading';


export default class TeamPage extends React.Component {

    goToPage = (teamMember) => {
        const { history } = this.props;
        history.push('/team/' + teamMember.id + '/1');
    }

    goToEdit = (teamMember) => {
        const { history } = this.props;
        const today = moment().toDate();
        history.push('/schedule/' + today.getDay() + '/' + teamMember.name)
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
                <Loading />

                <Text align='center' size='2rem' my='0.5rem' weight='900'>
                    {'Team'}
                </Text>

                <TeamList goToPage={this.goToPage} goToEdit={this.goToEdit} />
            </Flex>
        );
    }
}
