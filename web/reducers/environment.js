import api from 'scripts/api'
import moment from 'moment';

// Index of Action Types
const CHANGE_ERROR = 'environment/CHANGE_ERROR'
const DECREMENT_PENDING_NETWORK_CALLS = 'environment/DECREMENT_PENDING_NETWORK_CALLS'
const INCREMENT_PENDING_NETWORK_CALLS = 'environment/INCREMENT_PENDING_NETWORK_CALLS'
const RESET_PENDING_NETWORK_CALLS = 'environment/RESET_PENDING_NETWORK_CALLS'

// Reducer
const initialState = {
    pendingNetworkCalls: 0,
    error: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case CHANGE_ERROR:
        return {
            ...state,
            error: action.error
        }
    case DECREMENT_PENDING_NETWORK_CALLS:
        return {
            ...state,
            pendingNetworkCalls: state.pendingNetworkCalls - 1
        }
    case INCREMENT_PENDING_NETWORK_CALLS:
        return {
            ...state,
            pendingNetworkCalls: state.pendingNetworkCalls + 1
        }
    case RESET_PENDING_NETWORK_CALLS:
        return {
            ...state,
            pendingNetworkCalls: 0
        }
    default:
        return state
    }
}

// Actions



export function changeError() {
    return {
        type: CHANGE_ERROR
    };
}

export function decrementPendingNetworkCalls() {
    return {
        type: DECREMENT_PENDING_NETWORK_CALLS
    };
}

export function incrementPendingNetworkCalls() {
    return {
        type: INCREMENT_PENDING_NETWORK_CALLS
    };
}

export function resetPendingNetworkCalls() {
    return {
        type: RESET_PENDING_NETWORK_CALLS
    };
}