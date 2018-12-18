import React from 'react';

import Image from './Image';
import Flex from './Flex';

export default class TeamLogo extends React.Component {
    render() {
        return (

            <Flex
                alignItems='center'
                mx='auto'
                my='1rem'
                width='375px'
            >
                <Image
                    my='auto'
                    mx='auto'
                    src={require('../images/Set_Team.png')}
                />
            </Flex>
        );
    }
}
