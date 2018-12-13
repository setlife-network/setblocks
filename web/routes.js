import React from 'react';
import { Route, Switch } from 'react-router';

import LandingPage from 'components/LandingPage';

export default (
    <div className='routes-container'>
        <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/dashboard' component={LandingPage} />
            <Route path='/teamlist' component={LandingPage} />
        </Switch>
    </div>
);