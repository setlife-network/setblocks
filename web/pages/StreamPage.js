import React from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';
import TeamList from 'components/TeamList';
import Header from 'components/Header';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Input from 'components/Input';
import Loading from 'components/Loading';

import { STREAM_LINK } from '../constants'

class StreamPage extends React.Component {

    fetchSetblock = () => {

    }

    render() {

        return (
            <Flex
                column
                className='StreamPage'
                bg='primary'
                width='100%'
                alignItems='center'
            >
                <Header />
                <Loading />

                <Text align='center' size='2rem' my='0.5rem' weight='900'>
                    {'Stream'}
                </Text>

                <Text align='center' size='1rem' my='0.5rem'>
                    {'Active stream from YYYY-MM-DD HH:MM to YYYY-MM-DD HH:MM'}
                </Text>

                {/* <Input */}
                {/*     type='text' */}
                {/* /> */}



                <a target='_blank' href={STREAM_LINK}>
                    <Button m='1rem'>
                        Join Stream
                    </Button>
                </a>

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

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage)