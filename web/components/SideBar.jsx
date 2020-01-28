import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DayBlock from './DayBlock';
import Flex from './Flex';

import { changeEditModeEnabled, changeSelectedDay } from '../ducks/scheduling';

import theme from '../styles/theme';

class SideBar extends React.Component {

    goToScheduleDay(day) {
        const { history, match } = this.props;
        const dayIndex = day.getDay() == 0 ? 7 : day.getDay()

        if (match.params.teamMemberId) {
            history.push('/team/' + match.params.teamMemberId + '/' + dayIndex);
        } else {
            // If the match.params don't have a teamMemberId are u seeing your schedule
            history.push('/schedule/' + dayIndex);
            this.props.changeEditModeEnabled(true);
        }
        this.props.changeSelectedDay(day);
    }

    render() {
        const { days, selectedDay } = this.props;
        return (
            <Flex
                column
                className='SideBar'
                justifyContent='space-around'
                bg='primary'
                style={{ borderRight: `2px ${theme.colors.grey} solid` }}
            >
                {
                    days.map(day => (
                        <DayBlock
                            day={day}
                            key={day.getDay()}
                            selected={selectedDay.getDay() === day.getDay()}
                            onClick={(day) => this.goToScheduleDay(day)}
                        />
                    ))
                }
            </Flex>

        );
    }
}

const mapStateToProps = ({ environment, scheduling }) => {
    return {
        ...environment,
        ...scheduling
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeEditModeEnabled: (editMode) => dispatch(changeEditModeEnabled(editMode)),
        changeSelectedDay: (selectedDay) => dispatch(changeSelectedDay(selectedDay))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
