import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from 'components/Button';
import TeamList from 'components/TeamList';
import Header from 'components/Header';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Loading from 'components/Loading';

import { logout } from '../reducers/auth'

class TeamPage extends React.Component {

    goToPage = (teamMember) => {
        const { history } = this.props;
        history.push('/team/' + teamMember.id + '/1');
    }

    goToEdit = (teamMember) => {
        const { history } = this.props;
        const today = moment().toDate();
        history.push('/schedule/' + today.getDay() + '/' + teamMember.name)
    }

    handleLogout = () => {
        this.props.logout()
        this.props.history.replace('/')
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

                <Button onClick={this.handleLogout} m='5rem auto'>
                    Log out
                </Button>
            </Flex>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    };
};

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);

