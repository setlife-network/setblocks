import React from 'react';

import Flex from './Flex';
import Text from './Text';
import Card from './Card';

export default class SetBlock extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <Flex column center className='SetBlock' m='auto'>
                <Flex row center>
                    <Card
                        height='15px'
                        width='20px'
                        borderRight={data.blockFraction === '1.0' ? '' : '10px lightGrey solid'}
                        bg='red'
                        mx='1rem'
                    >
                    </Card>
                    <Text
                        weight='600'
                        aling='center'
                    >
                        {data.blockTime}
                    </Text>
                </Flex>
                <Flex column>
                    <Text
                        align='center'
                        my='0px'
                        mx='1rem'
                    >
                        {data.description}
                    </Text>
                </Flex>
            </Flex>
        );
    }
}
