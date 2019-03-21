import React from 'react';
import moment from 'moment';

import Flex from 'components/Flex';
import Text from 'components/Text';
import Loading from 'components/Loading';

class LandingPage extends React.Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
