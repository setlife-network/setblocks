import React from 'react';
import Flex from './Flex';
import DayBlock from './DayBlock';

export default class SideBar extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        const { days, selectedDay, goToScheduleDay } = this.props;
        return (
            <Flex
                column
                className='SideBar'
                justifyContent='space-around'
                bg='white'
            >
                {
                    days.map(day => (
                        <DayBlock
                            day={day}
                            key={day.getDay()}
                            selected={selectedDay === day}
                            onClick={goToScheduleDay}
                        />
                    ))
                }
            </Flex>

        );
    }
}
