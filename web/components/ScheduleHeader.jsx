import React from 'react';
import moment from 'moment';

import Text from './Text';
import Card from './Card';
import Flex from './Flex';


export default class ScheduleHeader extends React.Component {
    render() {
        const { selectedDay } = this.props;
        return (
            <Flex
                row
                className='ScheduleHeader'
            >
                <Card
                    width='10px'
                    height='10px'
                    bg='green' // TODO This color must be the color of the member
                    borderRadius={50}
                    my='auto'
                    mx='1rem'
                />
                <Text
                    weight='600'
                    align='center'
                    color='textSecondary'
                >
                    {moment(selectedDay).format('dddd, MMMM D, YYYY')}
                </Text>
            </Flex>
        );
    }
}
