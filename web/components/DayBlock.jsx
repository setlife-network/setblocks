import React from 'react';
import Flex from './Flex';
import Text from './Text';
import Card from './Card';

export default class DayBlock extends React.Component {
    render() {
        const { day, selected, onClick } = this.props

        //TODO Do something when is selected
        return (
            <Flex
                column
                center
                className='DayBlock'
                mr='0.5rem'
            >
                <Card
                    width='100%'
                    bg='white'
                    depth={9}
                    mx='0.5rem'
                    onClick={() => onClick(day)}
                >
                    <Text align='center' mb='0rem'>{day.getDate()}</Text>
                    <Text align='center' mt='0rem'>{day.toDateString().slice(0, 3)}</Text>
                </Card>
            </Flex>
        );
    }
}
