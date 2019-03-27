import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Flex from './Flex'

import routes from '../routes'
import NavigationBar from './NavigationBar';

import { checkAuthentication } from '../reducers/auth'

class App extends React.Component {
    componentDidMount() {
        // Run initialization functions here
        this.props.checkAuthentication()
        .then(loggedIn => {
            if (loggedIn) this.props.history.push('/team')
        })
    }

    render() {
        const { location } = this.props;

        return (
            <>
                <Flex height='92vh'>
                    {routes}
                </Flex>
                
                <Flex
                    height='8vh'
                    bg='primary'
                >
                    {this.props.loggedInUser.id != null &&
                        <NavigationBar path={location.pathname} />
                    }
                </Flex>
            </>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        ...auth
    };
};

const mapDispatchToProps = {
    checkAuthentication
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(App)