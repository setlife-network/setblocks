import React from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import moment from 'moment';

import Button from 'components/Button';
import TeamList from 'components/TeamList';
import Header from 'components/Header';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Loading from 'components/Loading';

class PaymentPage extends React.Component {

    handlePayment = (event) => {
        this.props.stripe.createToken().then(token => {
            console.log(token)

        })
    }

    render() {

        return (
            <Flex
                column
                className='PaymentPage'
                bg='primary'
                width='100%'
            >
                <Header />
                <Loading />

                <Text align='center' size='2rem' my='0.5rem' weight='900'>
                    {'Payment'}
                </Text>

                <Flex column mx='1rem' p='1rem'>
                    <CardElement/>
                </Flex>
                

                <Button onClick={this.handlePayment} m='5rem'>
                    Pay
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
}

export default injectStripe(PaymentPage)