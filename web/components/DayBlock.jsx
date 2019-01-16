import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Card from './Card';
import Flex from './Flex';
import Text from './Text';

import theme from '../styles/theme'

class DayBlock extends React.Component {

    renderTinySetBlocks = (setBlocks, day, fetchingData) => {
        const blockDay = moment(day).format('YYYY-MM-DD')
        const setBlocksByDate = _.groupBy(setBlocks, 'date')
        let setBlocksToRender = setBlocksByDate[blockDay] || [];
        setBlocksToRender = _.orderBy(setBlocksToRender, 'blockTime') // Order by blockTime to have all the tinyBlock ordered
        if (setBlocksToRender.length > 0 && !fetchingData) {
            return setBlocksToRender.map(setBlock => (
                <Card
                    key={setBlock.id}
                    height='8px'
                    width='8px'
                    borderBottom={setBlock.blockFraction === 1.0 ? `4px ${theme.colors.accent} solid` : (setBlock.blockFraction === 0.5 ? `4px ${theme.colors.accent} solid` : '')}
                    borderTop={setBlock.blockFraction === 1.0 ? `4px ${theme.colors.accent} solid` : (setBlock.blockFraction === -0.5 ? `4px ${theme.colors.accent} solid` : '')}
                    bg='primaryLight'
                    my='0.3rem'
                    mr='0.3rem'
                >
                </Card>
            ))
        } else {
            return <Card height='8px' width='5px' bg='none' my='0.3rem' mr='0.3rem' /> // To prevent the sidebar grows slightly in width when render the tinySetBlocks
        }
    }

    render() {
        const { day, selected, onClick, fetchingData, currentWeeklySetblocks } = this.props

        return (
            <Flex
                column
                center
                className='DayBlock'
                style={selected ? { borderBottom: `2px ${theme.colors.grey} solid`, borderTop: `2px ${theme.colors.grey} solid` } : {}}
            >
                <Card
                    width='100%'
                    bg={selected ? theme.colors.lightGrey : theme.colors.primary}
                    mx='0.5rem'
                    onClick={() => onClick(day)}
                >
                    <Flex row center>
                        <Flex column mx='0.5rem'>
                            { // If you are waiting for the API to respond, it does not render
                                this.renderTinySetBlocks(currentWeeklySetblocks, day, fetchingData)
                            }
                        </Flex>
                        <Flex column mr='auto'>
                            <Text align='center' mb='0rem' size={25} lineHeight='1' color={selected ? 'accent' : theme.colors.overlay}>
                                {day.getDate()}
                            </Text>
                            <Text align='center' mt='0rem' size={11} lineHeight='1' color={selected ? 'accent' : theme.colors.overlay}>
                                {day.toDateString().slice(0, 3)}
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        );
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        ...environment,
        fetchingData: environment.pendingNetworkCalls > 0
    };
};

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(DayBlock)