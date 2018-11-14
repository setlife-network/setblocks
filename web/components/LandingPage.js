import React from 'react';

import Button from './Button';
import Card from './Card';
import Flex from './Flex';
import Icon from './Icon';
import Text from './Text';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className='LandingPage'>
                <Flex
                    width='20%'
                    direction='column'
                    bg='green'
                >
                    <Card>
                        <Text>12</Text>
                        <Text>MON</Text>
                    </Card>
                </Flex>
            </div>
        );
    }
}