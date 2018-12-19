import React from 'react';
import Flex from './Flex';
import Text from './Text';
import Card from './Card';

export default class DayBlock extends React.Component {

    renderTinySetBlocks = (setBlocks) => {
        return setBlocks.map( setBlock => (
            <Card
                key={setBlock.id}
                height='8px'
                width='5px'
                borderBottom={setBlock.blockFraction === '1.0' ? '' : '4px lightGrey solid'}
                bg='red'
                my='0.3rem'
                mr='0.3rem'
            >
            </Card>
        ))
    }

    render() {
        const { day, selected, onClick } = this.props

        // TODO Remove this mock data and use a graphQl api
        const setBlocks = [{ id: '1', blockFraction: '1.0' }, { id: '2', blockFraction: '0.5' }, { id: '3', blockFraction: '1' }, { id: '4', blockFraction: '-0.5' }];

        return (
            <Flex
                column
                center
                className='DayBlock'
                mx='0.5rem'
            >
                <Card
                    width='100%'
                    bg='white'
                    borderLeft={selected ? '2px solid red' : '2px solid white'}
                    depth={9}
                    mx='0.5rem'
                    onClick={() => onClick(day)}
                >
                    <Flex row center>
                        <Flex column>
                            {this.renderTinySetBlocks(setBlocks)}
                        </Flex>
                        <Flex column>
                            <Text align='center' mb='0rem' color={selected ? 'red' : 'textSecondary'}>
                                {day.getDate()}
                            </Text>
                            <Text align='center' mt='0rem' color={selected ? 'red' : 'textSecondary'}>
                                {day.toDateString().slice(0, 3)}
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        );
    }
}
