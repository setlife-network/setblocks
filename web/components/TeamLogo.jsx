import React from 'react';

import Image from './Image';
import Card from './Card';
import Flex from './Flex';

export default class TeamLogo extends React.Component {
    render() {
        return (

            <Flex
                alignItems='center'
                mx='auto'
                my='1rem'
                width='100px'
            >
                <Card
                    width='80px'
                    height='40px'
                    border='2px solid'
                    borderColor='grey'
                    borderRadius={5}
                >
                    <Image
                        src={require('../images/Set_Team.png')}
                    />
                </Card>
            </Flex>
        );
    }
}
