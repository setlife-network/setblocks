import React from 'react';
import moment from 'moment';

import TeamList from 'components/TeamList';
import Header from 'components/Header';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Loading from 'components/Loading';


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
