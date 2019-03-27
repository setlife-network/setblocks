import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from 'components/Button';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Loading from 'components/Loading';

import { authenticateWithBlockstack, logout } from '../reducers/auth'

class LandingPage extends React.Component {
    handleBlockstackLogin = () => {
        this.props.authenticateWithBlockstack()
    }
    handleGithubLogin = () => {
        this.props.authenticateWithGithub()
    }

    render() {

        return (
            <Flex
                column
                className='LandingPage'
                bg='primary'
                width='100%'
            >
                <Loading />

                <Text align='center' size='1.25rem' my='0.5rem'>
                    {'Welcome to SetBlocks'}
                </Text>
                <Text align='center' size='1rem' m='0.5rem'>
                    {'Build your remote team with a simple collaborative interface'}
                </Text>
                <Text align='center' size='1rem' m='0.5rem'>
                    {'Schedule your workload in blocks and build a transparent proof of work for each issue'}
                </Text>

                {/* <Button onClick={this.handleBlockstackLogin}> */}
                {/*     Log in with Blockstack */}
                {/* </Button> */}
                <Button onClick={this.handleGithubLogin}>
                    Log in with GitHub
                </Button>

                <Button onClick={this.props.logout}>
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
    authenticateWithBlockstack,
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
