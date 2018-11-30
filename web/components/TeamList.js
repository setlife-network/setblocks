import React from 'react';

import Button from './Button';
import Flex from './Flex';
import Box from './Box';
import Icon from './Icon';
import Text from './Text';
import Image from './Image';
import Card from './Card';

export default class TeamList extends React.Component {
    goToPage = () => {
        console.log('goToTeamMember')
    }
    render() {
        return (
            <>
                <Card 
                    bg='red'
                    borderRadius={5}
                    width='250px'
                    height="30px"
                    mx='auto'
                    my='1rem'
                    depth='-1px 0px 15px rgba(0,0,0,0.65)'
                >
                    <Flex 
                        direction='row'
                        justifyContent='space-between'
                        mb='2rem' 
                        width='250px'
                        height='50px'
                        onClick={this.goToPage}
                    >
                        <Text 
                            color='black'
                            ml='0.75rem'
                            mt='0.25rem'
                            fontSize='2.5rem' 
                        >
                            David Lafarga
                        </Text>
                            
                        <Card
                            mr='1rem'
                            mt='0.38rem'
                        >
                            <Image 
                                
                                height='20px' 
                                src={require('../images/SettingsIcon.png')} 
                            />
                        </Card>
                    </Flex>
                </Card>
                <Card 
                    bg='blue'
                    borderRadius={5}
                    width='250px'
                    height="30px"
                    mx='auto'
                    my='1rem'
                    depth='-1px 0px 15px rgba(0,0,0,0.65)'
                >
                    <Flex
                        direction='row'
                        justifyContent='space-between'
                        mb='2rem' 
                        width='250px'
                        height='50px'
                        onClick={this.goToPage}
                    >
                        <Text 
                            color='black'
                            ml='0.75rem'
                            mt='0.25rem'
                            fontSize='2.5rem' 
                        >
                            Oscar Lafarga
                        </Text>
                        <Image 
                            mr='1rem'
                            mt='0.38rem'
                            height='20px' 
                            src={require('../images/SettingsIcon.png')} 
                        />
                    </Flex>
                </Card>
                <Card 
                    bg='purple'
                    borderRadius={5}
                    width='250px'
                    height="30px"
                    mx='auto'
                    my='1rem'
                    depth='-1px 0px 15px rgba(0,0,0,0.65)'
                >
                    <Flex 
                        direction='row'
                        justifyContent='space-between'
                        mb='2rem' 
                        width='250px'
                        height='50px'
                        onClick={this.goToPage}
                    >
                        <Text
                            color='black'
                            ml='0.75rem'
                            mt='0.25rem'
                            fontSize='2.5rem' 
                        >
                            Quinn Pruitt
                        </Text>
                        <Image 
                            mr='1rem'
                            mt='0.38rem'
                            height='20px' 
                            src={require('../images/SettingsIcon.png')} 
                        />
                    </Flex>
                </Card>
                <Card 
                    bg='green'
                    borderRadius={5}
                    width='250px'
                    height="30px"
                    mx='auto'
                    my='1rem'
                    depth='-1px 0px 15px rgba(0,0,0,0.65)'
                >
                    <Flex 
                        direction='row'
                        justifyContent='space-between'
                        mb='2rem' 
                        width='250px'
                        height='50px'
                        onClick={this.goToPage}
                    >
                        <Text 
                            color='black'
                            ml='0.75rem'
                            mt='0.25rem'
                            fontSize='2.5rem' 
                        >
                            Viki Lafarga
                        </Text>
                        <Image 
                            mr='1rem'
                            mt='0.38rem'
                            height='20px' 
                            src={require('../images/SettingsIcon.png')} 
                        />
                    </Flex>
                </Card>
            </>
        )
    }
}