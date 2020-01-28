import moment from 'moment';

// Index of Action Types
const CHANGE_CURRENT_TEAM_MEMBER = 'team/CHANGE_CURRENT_TEAM_MEMBER'
const RECEIVE_TEAM_MEMBERS = 'team/RECEIVE_TEAM_MEMBERS'

// Reducer
const initialState = {
    currentTeamMember: {
        id: '',
        name: ''
    },
    teamMembers: []
}

import api from 'scripts/api'

import {
    changeError,
    decrementPendingNetworkCalls,
    incrementPendingNetworkCalls,
    resetPendingNetworkCalls
} from './environment'

import {
    changeCurrentWeeklySetblocks
} from './scheduling'

export function changeCurrentTeamMember(member) {
    return {
        type: CHANGE_CURRENT_TEAM_MEMBER,
        member
    }
}

export function fetchAllTeamMembers(params) {
    return dispatch => {

//         let teamMembers = window.localStorage.getItem('teamMembers')
// 
//         console.log('teamMembers')
//         console.log(teamMembers)
//         if (teamMembers == null) {
//             return Promise.resolve(false)
//         } else {
//             dispatch(receiveTeamMembers(teamMembers))
//         }
        
        dispatch(incrementPendingNetworkCalls())

        return (
            api.graph({
                query: `query {
                    teamMembers {
                        id,
                        name
                    }
                }`
            })
            .then(payload => {
                // Handle payload
                // Dispatch additional actions
                dispatch(receiveTeamMembers(payload.teamMembers))
                return Promise.resolve(true)
            })
            .catch(err => {
                // Handle error
            })
            .finally(() => {
                dispatch(decrementPendingNetworkCalls())
            })
        )
    }
}

export function fetchCurrentTeamMemberById(params) {
    return dispatch => {
        dispatch(incrementPendingNetworkCalls())
        api.graph({
            query: `query {
                      teamMemberById(id: "${params.id}") {
                        id,
                        name,
                        weeklySetblocks {
                          id,
                          date,
                          blockTime,
                          blockFraction,
                          funded,
                          description
                        }
                      }
                    }`
        })
        .then(payload => {
                // Handle payload
                // Dispatch additional actions
            dispatch(changeCurrentTeamMember(payload.teamMemberById))
            dispatch(changeCurrentWeeklySetblocks(payload.teamMemberById.weeklySetblocks))
        })
        .catch(err => {
                // Handle error
            dispatch(changeError('Error fetching team member'))
        })
        .finally(() => {
            dispatch(decrementPendingNetworkCalls())
        })
    }
}

export function receiveTeamMembers(members) {
    return {
        type: RECEIVE_TEAM_MEMBERS,
        members
    }
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
    case CHANGE_CURRENT_TEAM_MEMBER:
        return {
            ...state,
            currentTeamMember: {
                ...state.currentTeamMember,
                ...action.member
            },
        }
    case RECEIVE_TEAM_MEMBERS:
        return {
            ...state,
            teamMembers: action.members
        }
    default:
        return state
    }
}