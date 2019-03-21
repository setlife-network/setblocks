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
                >
                    <NavigationBar path={location.pathname} />
                </Flex>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = {
    checkAuthentication
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(App)