import React from 'react';
import styled from 'styled-components';
import { alignSelf, justifyContent } from 'styled-system';
import Card from './Card';
import Flex from './Flex';
import Box from './Box';
import Image from './Image';
import NavigationBar from './NavigationBar';
import TeamList from './TeamList';

/* TODO

1. Add an icon or a different color to each button in the navigation bar to tell them apart
2. Have 2 different functions for the navigation buttons instead of having them both run `goToPage` (ie: `goToTeamPage`
    and `goToSchedulePage` could be two different functions)
3. Make a new component called `TeamLogo` and move the code that renders the "Set Team" image into that separate
    component.Then replace that code with <TeamLogo/>. This makes our components more readable and easier to manage.
    See how the TeamList component was migrated as an example.
4. Notice the new piece of "state" in this component. It determines which navigation bar button should be currently
    selected. Add logic that shows gives a button bg='blue' if it is selected and bg='gray' if it is not selected

*/

export default class LandingPage extends React.Component {
    state = {
        selectedButton: 'team'
    }

    goToPage() {
        console.log('dank memes are dank')
    }

    render() {
        return (
            <LandingPageContainer className='LandingPage' bg='lightGrey'>
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
                
                {/*Team list*/}

                <TeamList />

                <NavBarContainer>
                    <NavigationBar></NavigationBar>
                </NavBarContainer>

            </LandingPageContainer>
        );
    }
}

const LandingPageContainer = styled(Box)`
    position: absolute;
    top: 0px;
    left: 0px;
    min-width: 375px;
    width: 100%;
    min-height: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const NavBarContainer = styled('div')`
      margin-top: auto;
`