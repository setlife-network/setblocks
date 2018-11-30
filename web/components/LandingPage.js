import React from 'react';

import Button from './Button';
import Flex from './Flex';
import Box from './Box';
import Icon from './Icon';
import Text from './Text';
import Image from './Image';
import Card from './Card';

export default class LandingPage extends React.Component {
    goToPage() {
        console.log('dank memes are dank')
    }
    render() {
        return (
            <div className='LandingPage'>
                <Box
                    bg='lightGrey'    
                >
                    <Image 
                        src={require('../images/CombinedHeader.png')}
                    />

                    <Flex  alignItems='center'
                        mx='auto'
                        my='1rem'
                        width='100px'
                    >
                        <Card
                            width='80px'
                            height='40px'
                            bg=''
                            border='2px solid'
                            borderColor='grey'
                            borderRadius={5}
                            
                        >
                            <Image 
                           
                                src={require('../images/Set_Team.png')}
                            />
                        </Card>
                    </Flex>

                    <Card 
                        bg='red'
                        borderRadius={5}
                        width='250px'
                        height="30px"
                        mx='auto'
                        my='1rem'
                        depth='-1px 0px 15px rgba(0,0,0,0.65)'
                        
                        onClick={this.goToPage}
                    >
                        <Flex 
                            direction='row'
                            justifyContent='space-between'
                            mb='2rem' 
                            width='250px'
                            height='50px'
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

                    <Flex direction='row'>
                        <Card 
                            bg='bottomColor' 
                            height='75px'
                            width='100%'
                            mt='27rem'
                            mr='-15.6rem'
                        >

                        </Card>

                        <Card
                            bg='grey'
                            height='73px'
                            width='250px'
                            mt='27.1rem'
                            ml='-0.1rem'
                            borderRadius={5}
                        >
                            <Flex direction='row' justifyContent='flex-start'>
                                <Card
                                    onClick={this.goToPage}
                                    bg='grey'
                                    height='73px'
                                    width='125px'
                                    borderRadius={5}
                                >
                                    <Card
                                        bg='black'
                                        width='1px'
                                        height='61px'
                                        my='5%'
                                        mx='100%'
                                        depth='-2px 0px 10px rgba(0,0,0,0.5)'
                                    >
                                    </Card>
                                </Card>
                                <Card
                                    onClick={this.goToPage}
                                    bg='grey'
                                    height='73px'
                                    width='125px'
                                    borderRadius={5}
                                >
                                    <Card
                                        bg='black'
                                        width='1px'
                                        height='61px'
                                        my='5%'
                                        mx='1%'
                                        depth='2px 0px 10px rgba(0,0,0,0.5)'
                                    >
                                    </Card>
                                </Card>
                            </Flex>
                        </Card>
                    </Flex>
                </Box>
            </div>
        );
    }
}
