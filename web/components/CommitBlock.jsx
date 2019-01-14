import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Check } from 'styled-icons/feather/Check.cjs'

import Card from './Card';
import Flex from './Flex';
import Text from './Text';

import { createSetBlock, setEditModeSchedule, updateSetBlock } from '../reducers/environment';

class CommitBlock extends React.Component {

    state = {
        showToast: false
    }

    upsertSetBlocks = () => {
        const { selectedDay, unsavedSetBlocks, currentTeamMember } = this.props
        const day = moment(selectedDay).format('YYYY-MM-DD');
        unsavedSetBlocks[day].map( (setBlock) => {
            if (setBlock.id) {
                // Update
                console.log('Update - ID: ' + setBlock.id)
                // Remove console.log and add the follow line, when the method is ready
                // this.props.updateSetBlock(setBlock)
            } else if (setBlock.blockFraction !== 0) {
                // Create a new one if have blockFraction != 0
                this.props.createSetBlock({ teamMemberId: currentTeamMember.id, date: day, ...setBlock, issueUrl: (setBlock.issueUrl || '') })
            }
        })

        this.setState({
            showToast: true // Improve toast system in a future
        })
        _.delay( () => { // This probably made a warning but is only temporal, this will be removed with the toast system
            this.setState({
                showToast: false // Improve toast system in a future
            })
            this.props.setEditModeSchedule(false);
        }, 1000);


    }

    countHours() {
        const { selectedDay, unsavedSetBlocks } = this.props
        const day = moment(selectedDay).format('YYYY-MM-DD');
        return unsavedSetBlocks[day]
            ? unsavedSetBlocks[day].reduce( (last, setBlock) => {
            // Math.abs is used because the second blockFraction is represented by -0.5
                return last + (Math.abs(setBlock.blockFraction) * 4)
            }, 0)
            : 0 // If not defined yet, return 0
    }

    countBlockFractions() {
        const { selectedDay, unsavedSetBlocks } = this.props
        const day = moment(selectedDay).format('YYYY-MM-DD');
        return unsavedSetBlocks[day]
            ? unsavedSetBlocks[day].reduce( (last, setBlock) => {
            // Math.abs is used because the second blockFraction is represented by -0.5
                return last + (Math.abs(setBlock.blockFraction))
            }, 0)
            : 0 // If not defined yet, return 0
    }

    render() {
        const { selectedDay, enableSubmit } = this.props
        const { showToast } = this.state
        const onSaveToast = (
            <Text color='green'>
                {'SetBlock committed successfully!!'}
            </Text>
        )

        return (
            <Flex column center width='100%'>
                <Text
                    weight='600'
                    aling='center'
                    size='10px'
                    ml='-10rem'
                >
                    {this.countHours() + ' work hours scheduled'}
                </Text>

                <Flex row center>
                    {enableSubmit
                    && (
                        <Text
                            weight='600'
                            aling='center'
                            size='10px'
                            whiteSpace='pre'
                            mx='0.5rem'
                        >
                            {' Commit ' + this.countBlockFractions() + ' SetBlocks \n '
                        + 'for ' + moment(selectedDay).format('dddd, MMM Do') + '?'}
                        </Text>
                    )}
                    <Card
                        bg={enableSubmit ? '#F5F5F6' : 'overlay'}
                        minWidth='20%'
                        maxWidth='100px'
                        height='40px'
                        mx='auto'
                        borderRadius='5px'
                        depth={7}
                        onClick={() => this.upsertSetBlocks()}
                    >
                        <Text color='textSecondary' align='center' size='1rem' weight='600' mt='8px' mx='5px'>
                            {'Commit'}
                            {React.createElement(Check, {
                                size: 24,
                                color: 'black'
                            })}
                        </Text>
                    </Card>
                </Flex>
                {showToast && (onSaveToast)}
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
        createSetBlock: (params) => dispatch(createSetBlock(params)),
        updateSetBlock: (params) => dispatch(updateSetBlock(params)),
        setEditModeSchedule: (editMode) => dispatch(setEditModeSchedule(editMode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitBlock);
