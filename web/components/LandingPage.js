import React from 'react';

import Button from './Button';
import Card from './Card';
import Flex from './Flex';
import Box from './Box';
import Icon from './Icon';
import Text from './Text';
import Image from './Image';
import Card from './Card';

/* TODO

1. Add an icon or a different color to each button in the navigation bar to tell them apart
2. Have 2 different functions for the navigation buttons instead of having them both run `goToPage` (ie: `goToTeamPage` and `goToSchedulePage` could be two different functions)
3. Make a new component called `TeamLogo` and move the code that renders the "Set Team" image into that separate component. Then replace that code with <TeamLogo/>. This makes our components more readable and easier to manage. See how the TeamList component was migrated as an example.
4. Notice the new piece of "state" in this component. It determines which navigation bar button should be currently selected. Add logic that shows gives a button bg='blue' if it is selected and bg='gray' if it is not selected

*/

import TeamList from './TeamList';

export default class LandingPage extends React.Component {
    state = {
        selectedButton: 'team'
    }
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

                    <Flex
                        alignItems='center'
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

                    <TeamList/>

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
