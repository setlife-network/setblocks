import moment from 'moment';

import api from 'scripts/api'

// Index of Action Types
const RECEIVE_TEAM_MEMBERS = 'RECEIVE_TEAM_MEMBERS'
const RECEIVE_TEAM_MEMBER = 'RECEIVE_TEAM_MEMBER'
const SET_SELECTED_DAY = 'SET_SELECTED_DAY'
const FETCHING_DATA = 'FETCHING_DATA'

// Reducer
const initialState = {
    teamMembers: [],
    currentTeamMember: {
        id: '',
        name: '',
        weeklySetblocks: []
    },
    selectedDay: moment.now(),
    fetchingData: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case RECEIVE_TEAM_MEMBERS:
        return {
            ...state,
            teamMembers: action.members
        }
    case RECEIVE_TEAM_MEMBER:
        return {
            ...state,
            currentTeamMember: action.member
        }
    case SET_SELECTED_DAY:
        return {
            ...state,
            selectedDay: action.selectedDay
        }
    case FETCHING_DATA:
        return {
            ...state,
            fetchingData: action.fetchingData
        }
    default:
        return state
    }
}

// Actions
export function fetchAllTeamMembers(params) {

    return dispatch => {
        dispatch(setFetchingData(true))
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
            dispatch(setFetchingData(false))
        })
        .catch(err => {
            // Handle error
        })
    }
}

export function fetchCurrentTeamMemberById(params) {
    return dispatch => {
        dispatch(setFetchingData(true))
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
                          description
                        }
                      }
                    }`
        })
        .then(payload => {
                // Handle payload
                // Dispatch additional actions
            dispatch(receiveTeamMember(payload.teamMemberById))
            dispatch(setFetchingData(false))
        })
        .catch(err => {
                // Handle error
        })
    }
}


export function receiveTeamMembers(members) {
    return {
        type: RECEIVE_TEAM_MEMBERS,
        members
    }
}

export function receiveTeamMember(member) {
    return {
        type: RECEIVE_TEAM_MEMBER,
        member
    }
}

export function setSelectedDay(selectedDay) {
    return {
        type: SET_SELECTED_DAY,
        selectedDay
    }
}

export function setFetchingData(fetchingData) {
    return {
        type: FETCHING_DATA,
        fetchingData
    }
}