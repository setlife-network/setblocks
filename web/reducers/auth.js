// import * as blockstack from 'blockstack';

import {
    GITHUB_CLIENT_ID,
    OAUTH_REDIRECT_URI,
    USER_PROPS
} from '../constants'


// Index of Action Types
const RECEIVE_USER = 'RECEIVE_USER'

// Reducer
const initialState = {
    loggedInUser: {
        id: null
    }
}

import api from 'scripts/api'

import {
    decrementPendingNetworkCalls,
    incrementPendingNetworkCalls,
    resetPendingNetworkCalls
} from './environment'

export function authenticateWithBlockstack() {
    return dispatch => {
        console.log('authenticateWithBlockstack')

        api.graph({
            query: `checkUserSession{${USER_PROPS}}`
        })
        // blockstack.redirectToSignIn()

        // if (blockstack.isUserSignedIn()) {
        //   const userData = blockstack.loadUserData()
        //   console.log(userData.profile)
        // } else if (blockstack.isSignInPending()) {
        //     blockstack.handlePendingSignIn()
        //     .then(userData => {
        //         console.log(userData.profile)
        //     })
        // }
    }
}

export function authenticateWithGithub() {
    return dispatch => {
        console.log('authenticateWithGithub')

        window.open(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&scope=user%20repo`, '_self')
    }
}


export function checkAuthentication(params) {
    return dispatch => {
        dispatch(incrementPendingNetworkCalls())

        return api.graph({
            query: `query{
                checkUserSession{
                    id, name, githubUrl
                }
            }`
        })
        .then(payload => {
            dispatch(receiveUser(payload.checkUserSession))
            dispatch(decrementPendingNetworkCalls())
            return Promise.resolve(true)
        })
        .catch(err => {
            dispatch(resetPendingNetworkCalls())
        })
    }
}

export function logout() {
    return dispatch => {
        dispatch(incrementPendingNetworkCalls())

        return api.graph({
            query: `query{ logoutUser }`
        })
        .then(payload => {
            dispatch(receiveUser({ id: null }))
            dispatch(decrementPendingNetworkCalls())
        })
        .catch(err => {
            dispatch(resetPendingNetworkCalls())
        })
        // blockstack.signUserOut(window.location.origin)
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