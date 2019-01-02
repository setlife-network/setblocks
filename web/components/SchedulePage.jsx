import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import ScheduleHeader from './ScheduleHeader';
import SideBar from './SideBar';
import Flex from './Flex';
import SetBlock from './SetBlock';
import Text from './Text';

import { fetchCurrentTeamMemberById, setSelectedDay } from '../reducers/environment';

class SchedulePage extends React.Component {
    state = {
        daysOfWeek: [],
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
            // /schedule - SchedulePage, have today's day selected by default
            this.props.setSelectedDay(today)
        }
    }

    renderSetBlocks = (selectedDay) => {
        const { currentTeamMember } = this.props;
        selectedDay = moment(selectedDay).format('YYYY-MM-DD')
        const setBlocksByDate = _.groupBy(currentTeamMember.weeklySetblocks, 'date')
        const setBlocks = setBlocksByDate[selectedDay];
        if (setBlocks) {
            return setBlocks.map(setBlock => {
                return <SetBlock data={setBlock} key={setBlock.id} />
            })
        } else {
            return (
                <Text weight='600' aling='center'> This user hasn't committed any Setblocks for this day </Text>
            )
        }
    }

    getDaysOfWeek = () => {
        const startOfWeek = moment()
        .startOf('isoWeek');
        const endOfWeek = moment()
        .endOf('isoWeek');

        const days = [];
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(day.toDate());
            day = day.clone()
            .add(1, 'd');
        }

        this.setState({
            daysOfWeek: days,
        })
        this.props.setSelectedDay(days[0])
    }

    render() {
        const { match, currentTeamMember, selectedDay } = this.props;
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
                    <Flex
                        center
                        column
                    >
                        <Text
                            weight='900'
                            aling='center'
                            style={{ borderBottom: '1px solid red' }}
                        >
                            {match.params.teamMemberId ? currentTeamMember.name : 'Your'}
                            {' Schedule\'s Page'}
                        </Text>
                        {this.renderSetBlocks(selectedDay)}
                    </Flex>
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
        setSelectedDay: (selectedDay) => dispatch(setSelectedDay(selectedDay))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
