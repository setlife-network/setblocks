import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from 'components/Button';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Loading from 'components/Loading';

import { authenticateWithBlockstack, authenticateWithGithub, logout } from '../ducks/auth'

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

                <Text align='center' size='1.5rem' my='1.5rem'>
                    {'Welcome to SetBlocks'}
                </Text>
                <Text align='center' size='1rem' m='0.75rem 2rem'>
                    {'Build your remote team with a simple collaborative interface'}
                </Text>
                <Text align='center' size='1rem' m='0.75rem 2rem'>
                    {'Schedule your workload in blocks and build a transparent "proof of work"'}
                </Text>

                {/* <Button onClick={this.handleBlockstackLogin}> */}
                {/*     Log in with Blockstack */}
                {/* </Button> */}
                <Button onClick={this.handleGithubLogin} m='5rem auto'>
                    Log in with GitHub
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
    authenticateWithGithub,
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
