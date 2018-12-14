import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Flex from './Flex'

import routes from '../routes'
import NavigationBar from './NavigationBar';

class App extends React.Component {
    componentDidMount() {
        // Run initialization functions here
    }

    render() {
        const { location } = this.props;
        return (
            <>
                <Flex height='92vh'>
                    {routes}
                </Flex>
                <Flex
                    my='auto'
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

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(App)