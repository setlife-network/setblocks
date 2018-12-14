import React from 'react';
import { Route, Switch } from 'react-router';

import LandingPage from 'components/LandingPage';
import Flex from './components/Flex';


/*

-- Routing guide --
/ - LandingPage
/team - TeamPage
/team/:teamMemberId - TeamMemberPage
/schedule - SchedulePage, with today's day selected by default
/schedule/:dayOfWeek - SchedulePage, with correct day selected. dayOfWeek will be an integer from 0 to 6 (0 = Monday, 6 = Sunday)
/schedule/edit/:setblockId - SetblockDetailPage

*/

export default (
    <Flex className='routes-container' width='100vw'>
        <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/team' component={LandingPage} />
            <Route path='/team/:teamMemberId' component={LandingPage} />
            <Route path='/schedule' component={LandingPage} />
            <Route path='/schedule/:dayOfWeek' component={LandingPage} />
            <Route path='/schedule/edit/:setblockId' component={LandingPage} />
        </Switch>
    </Flex>
);