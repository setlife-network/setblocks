import api from 'scripts/api'

// Index of Action Types
const ACTION_NAME = 'ACTION_NAME'

// Reducer
const initialState = {
    setLife: true
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case ACTION_NAME:
        return {
            ...state,
            setLife: action.setLife
        }
    default:
        return state
    }
}

// Actions
export function sampleAsyncAction(params) {
    return dispatch => {
        api.graph({
            query: `query {
                apiGraphRoute
            }`
        })
        .then(payload => {
            // Handle payload
            // Dispatch additional actions
        })
        .catch(err => {
            // Handle error
        })
    }
}

export function sampleAction(setLife) {
    return {
        type: ACTION_NAME,
        setLife
    }
}
