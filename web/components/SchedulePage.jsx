import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Check } from 'styled-icons/feather/Check.cjs'

import ScheduleHeader from './ScheduleHeader';
import SideBar from './SideBar';
import Flex from './Flex';
import SetBlock from './SetBlock';
import Text from './Text';
import LoadingDots from './Loading';

import { fetchCurrentTeamMemberById, setEditModeSchedule, setSelectedDay } from '../reducers/environment';
import Card from './Card';

class SchedulePage extends React.Component {
    state = {
        daysOfWeek: [],
        setBlocksForEdit: {}
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

    componentWillReceiveProps(nextProps) {
        const { currentTeamMember, editModeSchedule } = this.props;
        // This is to make a different array for editing purpose, completed with empty set blocks
        // This only take effect if change the currentTeamMember
        if (editModeSchedule && currentTeamMember !== nextProps.currentTeamMember) {
            this.makeSetBlocksForEdit(nextProps.currentTeamMember);
        }
    }

    makeSetBlocksForEdit = (currentTeamMember) => {
        const { daysOfWeek } = this.state
        const setBlocksByDate = _.groupBy(currentTeamMember.weeklySetblocks, 'date')
        daysOfWeek.map((day) => {
            day = moment(day).format('YYYY-MM-DD')
            setBlocksByDate[day] = this.completeWithEmptySetBlocks(setBlocksByDate[day])
        })
        this.setState({
            setBlocksForEdit: setBlocksByDate
        })
    }

    completeWithEmptySetBlocks(setBlocks) {
        const defaultSetBlocks = [
            { blockTime: 'Setblock 1 (12am - 4am)', blockFraction: 0.0 },
            { blockTime: 'Setblock 2 (4:30am - 8:30am)', blockFraction: 0.0 },
            { blockTime: 'Setblock 3 (9am - 1pm)', blockFraction: 0.0 },
            { blockTime: 'Setblock 4 (1:30pm - 5:30pm)', blockFraction: 0.0 },
            { blockTime: 'Setblock 5 (6pm - 10pm)', blockFraction: 0.0 }
        ];
        let replacedBlocks = 0;
        defaultSetBlocks.forEach((setBlock, index, theArray) => {
            if (setBlocks && replacedBlocks < setBlocks.length && setBlock.blockTime === setBlocks[replacedBlocks].blockTime) {
                theArray[index] = setBlocks[replacedBlocks];
                replacedBlocks++;
            }
        })
        return defaultSetBlocks
    }

    upsertSetBlocks = () => {
        const { selectedDay } = this.props
        const { setBlocksForEdit } = this.state
        const day = moment(selectedDay).format('YYYY-MM-DD');
        setBlocksForEdit[day].map( (setBlock) => {
            if (setBlock.id) {
                // Update
                console.log('Update - ID: ' + setBlock.id)
            } else {
                // Create a new one if have blockFraction != 0
                console.log('Create - BlocTime: ' + setBlock.blockTime)
            }
        })
    }

    updateSetBlock(selectedDay, index, editedSetBlock ) {
        const { setBlocksForEdit } = this.state
        let dayEdited = setBlocksForEdit[selectedDay];
        dayEdited[index] = editedSetBlock;
        this.setState({
            setBlocksForEdit: {
                ...setBlocksForEdit,
                [selectedDay]: dayEdited
            }
        })
    }

    renderSetBlocks = (selectedDay) => {
        const { currentTeamMember, editModeSchedule } = this.props;
        const { setBlocksForEdit } = this.state
        selectedDay = moment(selectedDay).format('YYYY-MM-DD')
        const setBlocksByDate = _.groupBy(currentTeamMember.weeklySetblocks, 'date')
        let setBlocks = setBlocksByDate[selectedDay];

        if (editModeSchedule && setBlocksForEdit) {
            // If the match.params don't have a teamMemberId are u seeing your schedule
            // As it is your schedule, you can see the empty blocks, to complete then, that's why it is completed with the missing ones
            return this.completeWithEmptySetBlocks(setBlocks).map((setBlock, index) => {
                return (
                    <SetBlock
                        data={setBlock}
                        key={setBlock.id || (index + selectedDay)}
                        editMode={editModeSchedule} 
                        updateSetBlock={(editedSetBlock) => this.updateSetBlock(selectedDay, index, editedSetBlock )}
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
        const submitBtn = (
            <Card
                bg='backgroundSecondary'
                width='50%'
                minWidth='20%'
                maxWidth='220px'
                height='50px'
                mx='auto'
                mt='2rem'
                borderRadius='5px'
                depth={7}
                onClick={() => this.upsertSetBlocks()}
            >
                <Text color='textSecondary' align='center' size='1rem' weight='600'>
                    {'Submit Changes'}
                    {React.createElement(Check, {
                        size: 24,
                        color: 'black'
                    })}
                </Text>
            </Card>
        )

        if (fetchingData) {
            return ( // If you are waiting for the API to respond, render a loading
                <Flex
                    center
                    row
                >
                    <Text weight='900'>Loading</Text>
                    <LoadingDots />
                </Flex>
            )
        } else {
            return (
                <Flex
                    center
                    column
                >
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
                    {editModeSchedule && submitBtn}
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
        setEditModeSchedule: (editMode) => dispatch(setEditModeSchedule(editMode))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
