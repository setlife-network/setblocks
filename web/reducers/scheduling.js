import moment from 'moment';

// Index of Action Types
const CHANGE_CURRENT_WEEKLY_SETBLOCKS = 'scheduling/CHANGE_CURRENT_WEEKLY_SETBLOCKS'
const CHANGE_EDIT_MODE_ENABLED = 'scheduling/CHANGE_EDIT_MODE_ENABLED'
const CHANGE_SELECTED_DAY = 'scheduling/CHANGE_SELECTED_DAY'
const ENABLE_SUBMIT = 'scheduling/ENABLE_SUBMIT'
const UPDATE_UNSAVED_SET_BLOCKS = 'scheduling/UPDATE_UNSAVED_SET_BLOCKS'

// Reducer
const initialState = {
    currentWeeklySetblocks: [],
    editModeEnabled: false,
    enableSubmit: false,
    selectedDay: moment.now(),
    unsavedSetBlocks: [],
}

import api from 'scripts/api'

import {
    decrementPendingNetworkCalls,
    incrementPendingNetworkCalls,
    resetPendingNetworkCalls
} from './environment'

import {
    changeCurrentTeamMember,
    fetchCurrentTeamMemberById
} from './team'

export function changeCurrentWeeklySetblocks(setblocks) {
    return {
        type: CHANGE_CURRENT_WEEKLY_SETBLOCKS,
        setblocks
    }
}

export function createSetBlock(params) {
    return dispatch => {
        console.log('createSetBlock')
        console.log(params)
        dispatch(incrementPendingNetworkCalls())
        api.graph({
            query: `mutation {
                          TeamMember: createSetblock(
                            teamMemberId: "${params.teamMemberId}",
                            date: "${params.date}",
                            blockTime: "${params.blockTime}",
                            blockFraction: ${params.blockFraction},
                            description: "${params.description}",
                            issueUrl: "${params.issueUrl}"
                          ) {
                            id,
                            name,
                            weeklySetblocks{
                              id,
                              blockTime,
                              blockFraction,
                              description,
                              issueUrl,
                              date
                            }
                          }
                        }`
        })
        .then(payload => {
                // Handle payload
                // Dispatch additional actions
            dispatch(changeCurrentWeeklySetblocks(payload.TeamMember.weeklySetblocks))
        })
        .catch(err => {
                // Handle error
        })
        .finally(() => {
            dispatch(decrementPendingNetworkCalls())
        })
    }
}

export function deleteSetblock(params) {
    return (dispatch, getState) => {
        dispatch(incrementPendingNetworkCalls())
        api.graph({
            query: `mutation {
                       deleteSetblock(
                        setblockId: "${params.setblockId}"
                      )
                    }`
        })
        .then(payload => {
            
            const { currentTeamMember } = getState().team
            
            dispatch(fetchCurrentTeamMemberById({ id: currentTeamMember.id }))
        })
        .catch(err => {
            // Handle error
        })
        .finally(() => {
            dispatch(decrementPendingNetworkCalls())
        })
    }
}

export function updateSetBlock(params) {
    return (dispatch, getState) => {
        dispatch(incrementPendingNetworkCalls())
        api.graph({
            query: `mutation {
                       updateSetblock(
                        setblockId: "${params.id}"
                        updatedFields: {
                            blockFraction: ${params.blockFraction},
                                issueUrl: "${params.issueUrl}",
                                description: "${params.description}"
                        }
                      )
                    }`
        })
        .then(payload => {
            
            const { currentTeamMember } = getState().team

            dispatch(fetchCurrentTeamMemberById({ id: currentTeamMember.id }))
            dispatch(changeEditModeEnabled(false))
        })
        .catch(err => {
                // Handle error
        })
        .finally(() => {
            dispatch(decrementPendingNetworkCalls())
        })
    }
}

export function changeSelectedDay(selectedDay) {
    return {
        type: CHANGE_SELECTED_DAY,
        selectedDay
    }
}

export function changeEditModeEnabled(enabled) {
    return {
        type: CHANGE_EDIT_MODE_ENABLED,
        enabled
    }
}

export function setEnableSubmit(enableSubmit) {
    return {
        type: ENABLE_SUBMIT,
        enableSubmit
    }
}

export function updateUnsavedSetblocks(unsavedSetBlocks) {
    return {
        type: UPDATE_UNSAVED_SET_BLOCKS,
        unsavedSetBlocks,
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case CHANGE_CURRENT_WEEKLY_SETBLOCKS:
        return {
            ...state,
            currentWeeklySetblocks: action.setblocks
        }
    case CHANGE_EDIT_MODE_ENABLED:
        return {
            ...state,
            editModeEnabled: action.enabled
        }
    case CHANGE_SELECTED_DAY:
        return {
            ...state,
            selectedDay: action.selectedDay
        }
    case ENABLE_SUBMIT:
        return {
            ...state,
            enableSubmit: action.enableSubmit
        }
    case UPDATE_UNSAVED_SET_BLOCKS:
        return {
            ...state,
            unsavedSetBlocks: action.unsavedSetBlocks
        }
    default:
        return state
    }
}