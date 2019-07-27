import React from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import moment from 'moment';
import QRCode from 'qrcode.react';

import Button from 'components/Button';
import TeamList from 'components/TeamList';
import Header from 'components/Header';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Loading from 'components/Loading';

import { BTC_ADDRESS } from '../constants'

class PaymentPage extends React.Component {
    state = {
        paymentOption: 'btc'
    }

    fetchSetblock = () => {

    }

    handlePaymentOptionChange = (paymentOption) => {
        this.setState({ paymentOption })
    }

    handleBtcPayment = (event) => {
        console.log('handleBtcPayment')
        this.props.history.push(`/stream/${setblockId}`)
        // this.props.simulatePayment()
    }

    handleUsdPayment = (event) => {
        this.props.stripe.createToken().then(token => {
            console.log(token)

        })
    }

    render() {
        const { paymentOption } = this.state

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
                    {'Pay with ' + paymentOption.toUpperCase()}
                </Text>

                {paymentOption == 'btc' &&
                    <>
                        <Flex column alignItems='center' mx='1rem' p='1rem'>
                            <QRCode value={BTC_ADDRESS}/>
                        </Flex>
                        <Button onClick={this.handleBtcPayment} m='5rem'>
                            Simulate Payment
                        </Button>
                    </>
                }
                

                {paymentOption == 'usd' &&
                    <>
                        <Flex column mx='1rem' p='1rem'>
                            <CardElement/>
                        </Flex>
                        <Button onClick={this.handleUsdPayment} m='5rem'>
                            Confirm Payment
                        </Button>
                    </>
                }

                
                {/* <Button onClick={() => this.handlePaymentOptionChange('btc')} m='1rem'> */}
                {/*     Pay with BTC */}
                {/* </Button> */}
                {/* <Button onClick={() => this.handlePaymentOptionChange('usd')} m='1rem'> */}
                {/*     Pay with USD */}
                {/* </Button> */}

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