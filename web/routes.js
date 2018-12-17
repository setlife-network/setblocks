import React from 'react';
import { Route, Switch } from 'react-router';

import TeamPage from 'components/TeamPage';
import SchedulePage from './components/SchedulePage';
import Flex from './components/Flex';


/*

-- Routing guide --
/team - TeamPage
/team/:teamMemberId - TeamMemberPage
/schedule - SchedulePage, with today's day selected by default
/schedule/:dayOfWeek - SchedulePage, with correct day selected. dayOfWeek will be an integer from 0 to 6 (0 = Monday, 6 = Sunday)
/schedule/edit/:setblockId - SetblockDetailPage

*/

export default (
    <Flex className='routes-container' width='100vw'>
        <Switch>
            <Route exact path='/' component={TeamPage} />
            <Route path='/team/:teamMemberId' component={TeamPage} />
            <Route path='/schedule/:dayOfWeek' render={props => <SchedulePage {...props} />} />
            <Route path='/schedule/edit/:setblockId?' render={props => <SchedulePage {...props} />} />
            <Route path='/schedule' component={SchedulePage} />
            <Route path='/team' component={TeamPage} />
        </Switch>
    </Flex>
);