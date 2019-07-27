import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { cloneDeep } from 'lodash';

import SetBlock from './SetBlock';
import Text from './Text';
import { DEFAULT_SETBLOCKS } from '../constants';

import {
    setEnableSubmit, updateUnsavedSetblocks,
} from '../ducks/scheduling';

class BlockList extends React.Component {

    completeWithEmptySetBlocks(setBlocks) {
        const defaultSetBlocks = cloneDeep(DEFAULT_SETBLOCKS);
        let replacedBlocks = 0;
        setBlocks = _.orderBy(setBlocks, ['blockTime'], ['asc']); // Use Lodash to sort array by 'name'
        setBlocks = _.uniqBy(setBlocks, 'blockTime'); // Use Lodash to delete repeated blockTimes
        if (setBlocks && setBlocks.length > 0) { // To avoid iterate if the array is empty, return default
            defaultSetBlocks.forEach((setBlock, index, theArray) => {
                if (setBlocks && replacedBlocks < setBlocks.length && setBlock.blockTime === setBlocks[replacedBlocks].blockTime) {
                    theArray[index] = setBlocks[replacedBlocks];
                    replacedBlocks++;
                }
            });
        }
        return defaultSetBlocks
    }

    updateUnsavedSetBlock(selectedDay, index, editedSetBlock ) {
        const { unsavedSetBlocks } = this.props
        let dayEdited = unsavedSetBlocks[selectedDay];
        dayEdited[index] = editedSetBlock; // index 0 = SetBlock with blockTime 1
        this.props.updateUnsavedSetblocks({
            ...unsavedSetBlocks,
            [selectedDay]: dayEdited
        })
        this.props.setEnableSubmit(true)
    }

    render() {
        const {
            currentWeeklySetblocks,
            editModeEnabled,
            goToPaymentPage,
            goToStreamPage,
            unsavedSetBlocks,
            selectedDay 
        } = this.props;

        const selectedDayFormatted = moment(selectedDay).format('YYYY-MM-DD')
        let setBlocksByDate = _.groupBy(currentWeeklySetblocks, 'date');
        let setBlocks = setBlocksByDate[selectedDayFormatted];

        if (editModeEnabled && unsavedSetBlocks ) {
            // As it is your schedule, you can see the empty blocks, to complete then, that's why it is completed with the missing ones
            return this.completeWithEmptySetBlocks(setBlocks).map((setBlock, index) => {
                return (
                    <SetBlock
                        data={setBlock}
                        key={setBlock.id || (index + selectedDayFormatted)}
                        editMode={editModeEnabled}
                        updateSetBlock={(editedSetBlock) => this.updateUnsavedSetBlock(selectedDayFormatted, index, editedSetBlock )}
                    />
                )
            })
        } else if (!editModeEnabled && setBlocks) {
            setBlocks = _.orderBy(setBlocks, 'blockTime') // To properly render in order
            return setBlocks.map((setBlock, index) => {
                return (
                    <SetBlock
                        key={setBlock.id || index}
                        goToPaymentPage={goToPaymentPage}
                        goToStreamPage={goToStreamPage}
                        data={setBlock}
                    />
                )
            })
        } else {
            return (
                <Text weight='600' align='center'> This user hasn't committed any Setblocks for this day </Text>
            )
        }
    }
}

const mapStateToProps = ({ scheduling }) => {
    return {
        ...scheduling
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEnableSubmit: (enableSubmit) => dispatch(setEnableSubmit(enableSubmit)),
        updateUnsavedSetblocks: (unsavedSetBlocks) => dispatch(updateUnsavedSetblocks(unsavedSetBlocks))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BlockList);