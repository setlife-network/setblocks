import React from 'react';
import moment from 'moment';

import Text from './Text';
import Card from './Card';
import Flex from './Flex';
import theme from '../styles/theme';


export default class ScheduleHeader extends React.Component {
    render() {
        const { selectedDay } = this.props;
        return (
            <Flex
                row
                className='ScheduleHeader'
                center
                width='100%'
            >
                <Card
                    width='10px'
                    height='10px'
                    bg={theme.colors.transparent /* For the moment */}
                    borderRadius={50}
                    my='auto'
                    mx='0.5rem'
                />
                <Text
                    size={27}
                    align='center'
                    color={theme.colors.textPrimary}
                    my='0.5rem'
                    mx='auto'
                >
                    {moment(selectedDay).format('dddd Do')}
                </Text>

            </Flex>
        );
    }
}
