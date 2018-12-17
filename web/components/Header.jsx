import React from 'react';
import Image from './Image';
import Flex from './Flex';

export default class Header extends React.Component {
    render() {
        return (
            <Flex
                alignItems='center'
                mx='auto'
                my='1rem'
                width='375px'
            >
                <Image
                    src={require('../images/CombinedHeader.png')}
                />
            </Flex>
        );
    }
}
