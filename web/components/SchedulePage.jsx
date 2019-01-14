import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import BlockList from './BlockList';
import CommitBlock from './CommitBlock';
import Flex from './Flex';
import ScheduleHeader from './ScheduleHeader';
import SideBar from './SideBar';
import Text from './Text';

import { DEFAULT_SETBLOCKS, TEAM_NAME_ID_MAP } from '../constants';

import {
    fetchCurrentTeamMemberById,
    setEditModeSchedule,
    setEnableSubmit,
    setSelectedDay,
    updateUnsavedSetblocks
} from '../reducers/environment';
import Loading from './Loading';

import theme from '../styles/theme'

class SchedulePage extends React.Component {
    state = {
        daysOfWeek: [],
    }
    
    componentDidMount() {
        const { history, match } = this.props;
        const teamMemberName = match.params.teamMemberName || 'Oscar Lafarga'
        const teamMemberId = match.params.teamMemberId || TEAM_NAME_ID_MAP[teamMemberName]; // Workaround for id until to have a login
        this.props.fetchCurrentTeamMemberById({ id: teamMemberId })
        this.getDaysOfWeek()
        if (!match.params.teamMemberId) {
            const today = moment().toDate();
            // If the match.params don't have a teamMemberId are u seeing your schedule
            history.push('/schedule/' + today.getDay() + '/' + teamMemberName);
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
        const { currentTeamMember, editModeSchedule, selectedDay, history } = this.props;
        // This is to make a different array for editing purpose, completed with empty set blocks
        // This only take effect if change the currentTeamMember
        if (nextProps.currentTeamMember && nextProps.currentTeamMember.id === 'error') {
            history.push('/team'); // If the teamMemberId is invalid should go to /team
        }
        if ((editModeSchedule && currentTeamMember !== nextProps.currentTeamMember) || selectedDay !== nextProps.selectedDay) {
            this.makeSetBlocksForEdit(nextProps.currentWeeklySetblocks);
            this.props.setEnableSubmit(false)
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
        if (setBlocks && setBlocks.length > 0) { // To avoid iterate if the array is empty, return default
            defaultSetBlocks.forEach((setBlock, index, theArray) => {
                if (setBlocks && replacedBlocks < setBlocks.length && setBlock.blockTime === setBlocks[replacedBlocks].blockTime) {
                    theArray[index] = setBlocks[replacedBlocks];
                    replacedBlocks++;
                }
            });
        }
        return defaultSetBlocks
    }

    renderMainContent() {
        const { match, currentTeamMember, editModeSchedule, enableSubmit } = this.props

        return (
            <Flex
                center
                column
            >
                <Text
                    weight='900'
                    align='center'
                    mb='0px'
                    style={{ borderBottom: `1px solid ${theme.colors.secondary}` }}
                >
                    {match.params.teamMemberId ? currentTeamMember.name : 'Your'}
                    {' Schedule\'s Page'}
                </Text>
                <BlockList />
                {editModeSchedule && (<CommitBlock enableSubmit={enableSubmit} />)}
            </Flex>
        )
    }

    render() {
        const { selectedDay, loading } = this.props;
        const { daysOfWeek } = this.state;
        return (
            <Flex
                row
                flexDirection='horizontal'
                bg='primary'
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
                        center
                        bg='primary'
                    >
                        <ScheduleHeader selectedDay={selectedDay} />
                    </Flex>
                    <Loading />
                    {!loading && this.renderMainContent()}
                </Flex>
            </Flex>
        );
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        ...environment,
        loading: environment.pendingNetworkCalls > 0,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentTeamMemberById: (params) => dispatch(fetchCurrentTeamMemberById(params)),
        setSelectedDay: (selectedDay) => dispatch(setSelectedDay(selectedDay)),
        setEditModeSchedule: (editMode) => dispatch(setEditModeSchedule(editMode)),
        setEnableSubmit: (enableSubmit) => dispatch(setEnableSubmit(enableSubmit)),
        updateUnsavedSetblocks: (unsavedSetBlocks) => dispatch(updateUnsavedSetblocks(unsavedSetBlocks))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
