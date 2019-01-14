import api from 'scripts/api'
import moment from 'moment';

// Index of Action Types
const CREATE_SET_BLOCK = 'CREATE_SET_BLOCK'
const DELETE_SET_BLOCK = 'DELETE_SET_BLOCK'
const EDIT_MODE_SCHEDULE = 'EDIT_MODE_SCHEDULE'
const ENABLE_SUBMIT = 'ENABLE_SUBMIT'
const FETCHING_DATA = 'FETCHING_DATA'
const RECEIVE_TEAM_MEMBER = 'RECEIVE_TEAM_MEMBER'
const RECEIVE_TEAM_MEMBERS = 'RECEIVE_TEAM_MEMBERS'
const SET_SELECTED_DAY = 'SET_SELECTED_DAY'
const UPDATE_BLOCK_FRACTION = 'UPDATE_BLOCK_FRACTION'
const UPDATE_SET_BLOCK = 'UPDATE_SET_BLOCK'
const UPDATE_UNSAVED_SET_BLOCKS = 'UPDATE_UNSAVED_SET_BLOCKS'

// Reducer
const initialState = {
    currentTeamMember: {
        id: '',
        name: ''
    },
    currentWeeklySetblocks: [],
    editModeSchedule: false,
    enableSubmit: false,
    fetchingData: false,
    teamMembers: [],
    selectedDay: moment.now(),
    unsavedSetBlocks: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case CREATE_SET_BLOCK:
        return {
            ...state,

            currentWeeklySetblocks: action.teamMember.weeklySetblocks
        }
    case DELETE_SET_BLOCK:
        return {
            ...state,
            currentWeeklySetblocks: state.currentWeeklySetblocks.filter(setBlock => setBlock.id !== action.setBlockId )
        }
    case EDIT_MODE_SCHEDULE:
        return {
            ...state,
            editModeSchedule: action.editModeSchedule
        }
    case ENABLE_SUBMIT:
        return {
            ...state,
            enableSubmit: action.enableSubmit
        }
    case FETCHING_DATA:
        return {
            ...state,
            fetchingData: action.fetchingData
        }
    case RECEIVE_TEAM_MEMBER:
        return {
            ...state,
            currentTeamMember: { id: action.member.id, name: action.member.name },
            currentWeeklySetblocks: action.member.weeklySetblocks
        }
    case RECEIVE_TEAM_MEMBERS:
        return {
            ...state,
            teamMembers: action.members
        }
    case SET_SELECTED_DAY:
        return {
            ...state,
            selectedDay: action.selectedDay
        }
    case UPDATE_BLOCK_FRACTION:
        return {
            ...state,
            currentWeeklySetblocks: state.currentWeeklySetblocks.map(
                (setBlock) => setBlock.id === action.blockId ? { ...setBlock, blockFraction: action.blockFraction } : setBlock
            )
        }
    case UPDATE_SET_BLOCK:
        return {
            ...state,
            currentWeeklySetblocks: state.currentWeeklySetblocks.map(
                (setBlock) => setBlock.id === action.setBlocks.blockId ? action.setBlocks : setBlock
            )
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
        })
        .catch(err => {
            // Handle error
        })
        .finally(() => {
            dispatch(setFetchingData(false))
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
        })
        .catch(err => {
                // Handle error
            dispatch(receiveTeamMember({ id: 'error' }))
        })
        .finally(() => {
            dispatch(setFetchingData(false))
        })
    }
}

export function createSetBlock(params) {
    return dispatch => {
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
            dispatch(createBlock(payload.TeamMember))
        })
        .catch(err => {
                // Handle error
        })
    }
}

export function updateSetBlock(params) {
    return dispatch => {
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
                // Handle payload
                // Dispatch additional actions
            dispatch(updateBlock(payload.updateSetblock))
        })
        .catch(err => {
                // Handle error
        })
    }
}

export function deleteSetblock(params) {
    return dispatch => {
        api.graph({
            query: `mutation {
                       deleteSetblock(
                        setblockId: "${params.setblockId}"
                      )
                    }`
        })
        .then(payload => {
            // Handle payload
            // Dispatch additional actions
            dispatch(deleteBlock(params.setblockId))
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

export function setEditModeSchedule(editModeSchedule) {
    return {
        type: EDIT_MODE_SCHEDULE,
        editModeSchedule
    }
}

export function setEnableSubmit(enableSubmit) {
    return {
        type: ENABLE_SUBMIT,
        enableSubmit
    }
}

export function updateBlockFraction(blockId, blockFraction) {
    return {
        type: UPDATE_BLOCK_FRACTION,
        blockFraction,
        blockId
    }
}

export function updateUnsavedSetblocks(unsavedSetBlocks) {
    return {
        type: UPDATE_UNSAVED_SET_BLOCKS,
        unsavedSetBlocks,
    }
}

export function createBlock(teamMember) {
    return {
        type: CREATE_SET_BLOCK,
        teamMember,
    }
}

export function updateBlock(setBlocks) {
    return {
        type: UPDATE_SET_BLOCK,
        setBlocks,
    }
}

export function deleteBlock(setBlockId) {
    return {
        type: DELETE_SET_BLOCK,
        setBlockId,
    }
}