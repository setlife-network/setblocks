import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { STRIPE_PUBLIC_KEY } from '../constants'

import Flex from './Flex'
import NavigationBar from './NavigationBar';

import routes from '../routes'

import { checkAuthentication } from '../reducers/auth'

class App extends React.Component {
    componentDidMount() {
        console.log('componentDidMount')
        // Run initialization functions here
        this.props.checkAuthentication()
        .then(loggedIn => {
            // if (loggedIn) this.props.history.push('/team')
        })
    }

    render() {
        const { location } = this.props;

        return (
            <>
                <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
                    <Flex height='92vh'>
                        <Elements>
                            {routes}
                        </Elements>
                    </Flex>
                </StripeProvider>

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