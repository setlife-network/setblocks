import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DayBlock from './DayBlock';
import Flex from './Flex';

import { changeEditModeEnabled, changeSelectedDay } from '../reducers/scheduling';

import theme from '../styles/theme';

class SideBar extends React.Component {

    goToScheduleDay(day) {
        const { history, match } = this.props;
        if (match.params.teamMemberId) {
            history.push('/team/' + match.params.teamMemberId + '/' + day.getDay());
        } else {
            // If the match.params don't have a teamMemberId are u seeing your schedule
            history.push('/schedule/' + day.getDay());
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

const mapStateToProps = ({ environment }) => {
    return {
        ...environment
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeEditModeEnabled: (editMode) => dispatch(changeEditModeEnabled(editMode)),
        changeSelectedDay: (selectedDay) => dispatch(changeSelectedDay(selectedDay))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
