import React from 'react';

import Button from './Button';
import Flex from './Flex';
import Icon from './Icon';
import Text from './Text';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className='LandingPage'>
                <Flex>
                    <Text m='1rem'>This is the LandingPage component</Text>
                    <Button m='1rem'>Click here</Button>
                </Flex>
            </div>
        );
    }
}