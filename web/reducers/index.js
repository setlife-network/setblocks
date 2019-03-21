import { combineReducers } from 'redux'

import auth from './auth'
import environment from './environment'
import scheduling from './scheduling'
import team from './team'

export default combineReducers({
    auth,
    environment,
    scheduling,
    team
})
