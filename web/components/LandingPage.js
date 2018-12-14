import React from 'react';

import TeamList from './TeamList';
import TeamLogo from './TeamLogo';
import Header from './Header';
import Flex from './Flex';



export default class LandingPage extends React.Component {

    render() {
        return (
            <Flex
                column
                className='LandingPage'
                bg='lightGrey'
                width='100%'
            >
                <Header />

                <TeamLogo />

                <TeamList />
            </Flex>
        );
    }
}
