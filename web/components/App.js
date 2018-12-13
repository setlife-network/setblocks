import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Flex from './Flex'

import routes from '../routes'

class App extends React.Component {
    componentDidMount() {
        // Run initialization functions here
    }

    render() {
        return (
            <Flex>
                {routes}
            </Flex>
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