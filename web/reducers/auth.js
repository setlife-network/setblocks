import moment from 'moment';

// Index of Action Types
const RECEIVE_USER = 'RECEIVE_USER'

// Reducer
const initialState = {
    loggedInUser: {
        id: null,
    }
}

import api from 'scripts/api'

import {
    decrementPendingNetworkCalls,
    incrementPendingNetworkCalls,
    resetPendingNetworkCalls
} from './environment'

export function checkAuthentication(params) {
    return dispatch => {
//         dispatch(incrementPendingNetworkCalls())
// 
//         api.graph({
//             query: `{}`
//         })
//         .then(payload => {
//             dispatch(receiveUser(payload.TeamMember))
//         })
//         .catch(err => {
//             dispatch(resetPendingNetworkCalls())
//         })
//         .finally(() => {
//             dispatch(decrementPendingNetworkCalls())
//         })
    }
}

export function receiveUser(user) {
    return {
        type: RECEIVE_USER,
        user
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case RECEIVE_USER:
        return {
            ...state,
            loggedInUser: action.user
        }
    default:
        return state
    }
}