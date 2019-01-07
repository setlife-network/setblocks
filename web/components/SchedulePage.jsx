import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import ScheduleHeader from './ScheduleHeader';
import SideBar from './SideBar';
import Flex from './Flex';
import SetBlock from './SetBlock';
import Text from './Text';
import LoadingDots from './Loading';
import CommitBlock from './CommitBlock';
import { DEFAULT_SETBLOCKS } from '../constants/index';

import {
    fetchCurrentTeamMemberById,
    setEditModeSchedule,
    setSelectedDay,
    updateUnsavedSetblocks
} from '../reducers/environment';


class SchedulePage extends React.Component {
    state = {
        daysOfWeek: [],
        enableSubmit: false,
    }
    
    componentDidMount() {
        const { history, match } = this.props;
        const teamMemberId = match.params.teamMemberId || 'recGVSamjigJbZoJ8';// mocked id until to have a login
        this.props.fetchCurrentTeamMemberById({ id: teamMemberId })
        this.getDaysOfWeek()
        if (!match.params.teamMemberId) {
            const today = moment().toDate();
            // If the match.params don't have a teamMemberId are u seeing your schedule
            history.push('/schedule/' + today.getDay());
            this.props.setEditModeSchedule(true);
            // /schedule - SchedulePage, have today's day selected by default
            this.props.setSelectedDay(today)
        } else {
            // Edit mode in only available in your own schedule
            this.props.setEditModeSchedule(false);
        }

    }

    getDaysOfWeek = () => {
        const startOfWeek = moment().startOf('isoWeek');
        const endOfWeek = moment().endOf('isoWeek');

        const days = [];
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }

        this.setState({
            daysOfWeek: days,
        })
        this.props.setSelectedDay(days[0])
    }

    componentDidUpdate (nextProps) {
        const { currentTeamMember, editModeSchedule, selectedDay } = this.props;
        // This is to make a different array for editing purpose, completed with empty set blocks
        // This only take effect if change the currentTeamMember
        if ((editModeSchedule && currentTeamMember !== nextProps.currentTeamMember) || selectedDay !== nextProps.selectedDay) {
            this.makeSetBlocksForEdit(nextProps.currentWeeklySetblocks);
            this.setState({ enableSubmit: false })
        }
    }

    makeSetBlocksForEdit = (currentWeeklySetblocks) => {
        const { selectedDay } = this.props;
        const setBlocksByDate = _.groupBy(currentWeeklySetblocks, 'date')
        const day = moment(selectedDay).format('YYYY-MM-DD')
        setBlocksByDate[day] = this.completeWithEmptySetBlocks(setBlocksByDate[day])
        this.props.updateUnsavedSetblocks(setBlocksByDate)
    }

    completeWithEmptySetBlocks(setBlocks) {
        const defaultSetBlocks = cloneDeep(DEFAULT_SETBLOCKS);
        let replacedBlocks = 0;
        setBlocks = _.orderBy(setBlocks, ['blockTime'], ['asc']); // Use Lodash to sort array by 'name'
        setBlocks = _.uniqBy(setBlocks, 'blockTime'); // Use Lodash to delete repeated blockTimes
        defaultSetBlocks.forEach((setBlock, index, theArray) => {
            if (setBlocks && replacedBlocks < setBlocks.length && setBlock.blockTime === setBlocks[replacedBlocks].blockTime) {
                theArray[index] = setBlocks[replacedBlocks];
                replacedBlocks++;
            }
        });
        return defaultSetBlocks
    }

    updateUnsavedSetBlock(selectedDay, index, editedSetBlock ) {
        const { unsavedSetBlocks } = this.props
        let dayEdited = unsavedSetBlocks[selectedDay];
        dayEdited[index] = editedSetBlock; // index 0 = SetBlock with blockTime 1
        this.props.updateUnsavedSetblocks({
            ...unsavedSetBlocks,
            [selectedDay]: dayEdited
        })
        this.setState({ enableSubmit: true })
    }

    renderSetBlocks = (selectedDay) => {
        const { editModeSchedule, currentWeeklySetblocks, unsavedSetBlocks } = this.props;
        selectedDay = moment(selectedDay).format('YYYY-MM-DD')
        const setBlocksByDate = _.groupBy(currentWeeklySetblocks, 'date')
        let setBlocks = setBlocksByDate[selectedDay];

        if (editModeSchedule && unsavedSetBlocks) {
            // If the match.params don't have a teamMemberId are u seeing your schedule
            // As it is your schedule, you can see the empty blocks, to complete then, that's why it is completed with the missing ones
            return this.completeWithEmptySetBlocks(setBlocks).map((setBlock, index) => {
                return (
                    <SetBlock
                        data={setBlock}
                        key={setBlock.id || (index + selectedDay)}
                        editMode={editModeSchedule} 
                        updateSetBlock={(editedSetBlock) => this.updateUnsavedSetBlock(selectedDay, index, editedSetBlock )}
                    />
                )
            })
        } else if (!editModeSchedule && setBlocks) {
            return setBlocks.map((setBlock, index) => {
                return <SetBlock data={setBlock} key={setBlock.id || index} />
            })
        } else {
            return (
                <Text weight='600' align='center'> This user hasn't committed any Setblocks for this day </Text>
            )
        }
    }

    renderIfItReady() {
        const {
            match, currentTeamMember, fetchingData, selectedDay, editModeSchedule
        } = this.props
        const { enableSubmit } = this.state

        if (fetchingData) {
            return ( // If you are waiting for the API to respond, render a loading
                <Flex center row>
                    <Text weight='900'>Loading</Text>
                    <LoadingDots />
                </Flex>
            )
        } else {
            return (
                <Flex center column>
                    <Text
                        weight='900'
                        aling='center'
                        mb='0px'
                        style={{ borderBottom: '1px solid red' }}
                    >
                        {match.params.teamMemberId ? currentTeamMember.name : 'Your'}
                        {' Schedule\'s Page'}
                    </Text>
                    {this.renderSetBlocks(selectedDay)}
                    {editModeSchedule && (<CommitBlock enableSubmit={enableSubmit}></CommitBlock>)}
                </Flex>
            )
        }
    }

    render() {
        const { selectedDay } = this.props;
        const { daysOfWeek } = this.state;
        return (
            <Flex
                row
                flexDirection='horizontal'
                width='100%'
                className='SchedulePage'
            >
                <Flex row>
                    <SideBar
                        days={daysOfWeek}
                        selectedDay={selectedDay}
                    />
                </Flex>
                <Flex
                    column
                    width='100%'
                >
                    <Flex
                        bg='red'
                        center
                    >
                        <ScheduleHeader selectedDay={selectedDay} />
                    </Flex>
                    {this.renderIfItReady()}
                </Flex>
            </Flex>
        );
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        ...environment
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentTeamMemberById: (params) => dispatch(fetchCurrentTeamMemberById(params)),
        setSelectedDay: (selectedDay) => dispatch(setSelectedDay(selectedDay)),
        setEditModeSchedule: (editMode) => dispatch(setEditModeSchedule(editMode)),
        updateUnsavedSetblocks: (unsavedSetBlocks) => dispatch(updateUnsavedSetblocks(unsavedSetBlocks))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
