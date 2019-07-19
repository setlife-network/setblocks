import React from 'react';
import { Route, Switch } from 'react-router';

import Flex from 'components/Flex';

import LandingPage from 'pages/LandingPage';
import PaymentPage from 'pages/PaymentPage';
import SchedulePage from 'pages/SchedulePage';
import TeamPage from 'pages/TeamPage';


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
            <Route exact path='/' component={LandingPage} />

            <Route
                key='schedule'
                path='/schedule/:dayOfWeek/:teamMemberName'
                component={SchedulePage}
            />
            <Route
                key='schedule/edit'
                path='/schedule/edit/:setblockId?'
                component={SchedulePage}
            />
            <Route
                key='schedule'
                path='/schedule'
                component={SchedulePage}
            />
            <Route
                key='team'
                path='/team/:teamMemberId/:dayOfWeek'
                component={SchedulePage}
            />
            <Route
                key='team'
                path='/team'
                component={TeamPage}
            />
            <Route
                key='pay'
                path='/pay'
                component={PaymentPage}
            />
            

            
        </Switch>
    </Flex>
);