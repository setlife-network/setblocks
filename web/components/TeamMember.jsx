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
                    bg='primary'
                    width='95%'
                    minWidth='20%'
                    maxWidth='530px'
                    height='60px'
                    mx='auto'
                    mt='1rem'
                    depth={7}
                >
                    <Flex row center>
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
                                ml='20%'
                            />
                            <Text
                                color='textPrimary'
                                size='1rem'
                                weight='600'
                                ml='15%'
                            >
                                {name}
                            </Text>
                        </Flex>
                        <Flex height='60px' mr='50px'>
                            { // Workaround for edit until to have a login
                                React.createElement(Edit3, {
                                    size: 24,
                                    color: theme.colors.lightBlue,
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
