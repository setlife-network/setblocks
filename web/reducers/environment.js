import api from 'scripts/api'

// Index of Action Types
const RECEIVE_TEAM_MEMBERS = 'RECEIVE_TEAM_MEMBERS'

// Reducer
const initialState = {
    teamMembers: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case RECEIVE_TEAM_MEMBERS:
        return {
            ...state,
            teamMembers: action.members
        }
    default:
        return state
    }
}

// Actions
export function fetchAllTeamMembers(params) {
    return dispatch => {
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
