import React from 'react';
import { Edit3 } from 'styled-icons/feather/Edit3.cjs'

import Card from './Card';
import Flex from './Flex';
import Text from './Text';

import theme from '../styles/theme';


export default class TeamMember extends React.Component {
    render() {
        const { goToPage, name, color, goToEdit } = this.props;
        
        return (
            <>
                <Card
                    bg='white'
                    width='90%'
                    minWidth='20%'
                    maxWidth='530px'
                    height='60px'
                    mx='auto'
                    mt='1.5rem'
                    depth={1}
                >
                    <Flex row center px='1rem'>
                        <Flex
                            direction='row'
                            mb='2rem'
                            width='100%'
                            height='60px'
                            onClick={goToPage}
                        >
                            <Card
                                width='10px'
                                height='10px'
                                bg={color}
                                borderRadius={50}
                                my='auto'
                                mx='5%'
                            />
                            <Text
                                color='textPrimary'
                                size='1rem'
                                my='auto'
                                weight='600'
                                ml='5%'
                            >
                                {name}
                            </Text>
                        </Flex>
                        <Flex height='60px'>
                            { // Workaround for edit until to have a login
                                React.createElement(Edit3, {
                                    size: 24,
                                    color: theme.colors.charcoal,
                                    onClick: goToEdit
                                })
                            }
                        </Flex>
                    </Flex>
                </Card>
            </>
        );
    }
}
