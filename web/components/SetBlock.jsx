import React from 'react';
import { connect } from 'react-redux';
import { Edit3 } from 'styled-icons/feather/Edit3.cjs'

import Flex from './Flex';
import Text from './Text';
import Card from './Card';


class SetBlock extends React.Component {

    state = {
        data: {},
        left: 0,
        originalOffset: 0,
        velocity: 0,
        timeOfLastDragEvent: 0,
        touchStartX: 0,
        prevTouchX: 0,
        beingTouched: false,
        widthRight: 0,
        widthLeft: 0
    };

    componentDidMount() {
        const { data } = this.props;
        this.setState({
            data, // To make the volatile edition available. Not save it if change the selected Day
            widthRight: data.blockFraction === 1.0 ? 110 : (data.blockFraction === 0.5 ? 110 : 0),
            widthLeft: data.blockFraction === 1.0 ? 110 : (data.blockFraction === -0.5 ? 110 : 0),
        })
    }

    handleLeftSwipe() {
        const { updateSetBlock } = this.props;
        const { data } = this.state;
        let blockFraction = 1;
        switch (data.blockFraction) {
        case 0.5:
        case 0:
            blockFraction = 0.5;
            break;
        }
        updateSetBlock({ ...data, blockFraction: blockFraction });
        this.setState({
            left: 0,
            originalOffset: 0,
            velocity: 0,
            timeOfLastDragEvent: 0,
            touchStartX: 0,
            prevTouchX: 0,
            beingTouched: false,
            widthRight: 110,
            data: {
                ...data,
                blockFraction: blockFraction
            },
        });
    }

    handleRightSwipe() {
        const { updateSetBlock } = this.props;
        const { data } = this.state;
        let blockFraction = 1;
        switch (data.blockFraction) {
        case -0.5:
        case 0:
            blockFraction = -0.5;
            break;
        }
        updateSetBlock({ ...data, blockFraction: blockFraction });
        this.setState({
            left: 0,
            originalOffset: 0,
            velocity: 0,
            timeOfLastDragEvent: 0,
            touchStartX: 0,
            prevTouchX: 0,
            beingTouched: false,
            widthLeft: 110,
            data: {
                ...data,
                blockFraction: blockFraction
            },
        });
    }

    handleStart(clientX) {
        const { left } = this.state;
        this.setState({
            originalOffset: left,
            velocity: 0,
            timeOfLastDragEvent: Date.now(),
            touchStartX: clientX,
            prevTouchX: 0,
            beingTouched: true,
        });
    }

    handleMove(clientX) {
        const {
            beingTouched, timeOfLastDragEvent, prevTouchX, touchStartX, originalOffset 
        } = this.state;
        if (beingTouched) {
            const touchX = clientX;
            const currTime = Date.now();
            const elapsed = currTime - timeOfLastDragEvent;
            const velocity = 20 * (touchX - prevTouchX) / elapsed;
            let deltaX = touchX - touchStartX + originalOffset;
            if (deltaX < -50) {
                this.handleLeftSwipe();
            } else if (deltaX > 50) {
                this.handleRightSwipe();
            }
            this.setState({
                left: deltaX,
                velocity,
                timeOfLastDragEvent: currTime,
                prevTouchX: touchX
            });
        }
    }

    handleEnd() {
        const { velocity } = this.state;
        this.setState({
            velocity: velocity,
            touchStartX: 0,
            beingTouched: false,
        });
    }

    handleTouchStart(touchStartEvent) {
        this.handleStart(touchStartEvent.targetTouches[0].clientX);
    }

    handleTouchMove(touchMoveEvent) {
        this.handleMove(touchMoveEvent.targetTouches[0].clientX);
    }

    handleTouchEnd() {
        this.handleEnd();
    }

    handleMouseDown(mouseDownEvent) {
        mouseDownEvent.preventDefault();
        this.handleStart(mouseDownEvent.clientX);
    }

    handleMouseMove(mouseMoveEvent) {
        this.handleMove(mouseMoveEvent.clientX);
    }

    handleMouseUp() {
        this.handleEnd();
    }

    handleMouseLeave() {
        this.handleMouseUp();
    }

    handleTap() {
        const { updateSetBlock } = this.props;
        const { data } = this.state;
        // If the blockFraction is 0, set in 1, if not set in 0.
        const newBlockFraction = data.blockFraction === 0 ? 1 : 0
        updateSetBlock({ ...data, blockFraction: newBlockFraction });
        this.setState({
            data: {
                ...data,
                blockFraction: newBlockFraction
            },
            widthLeft: newBlockFraction * 110,
            widthRight: newBlockFraction * 110
        });
    }

    render() {
        const { editMode } = this.props;
        const { widthRight, widthLeft, data } = this.state;

        //Square that represents the fraction of time allocated in the setBlock, in readOnly mode
        const tinyBlocks = (
            <Card
                height='16px'
                width='16px'
                borderRight={data.blockFraction === 1.0 ? '8px #F93B6A solid' : (data.blockFraction === 0.5 ? '8px #F93B6A solid' : '')}
                borderLeft={data.blockFraction === 1.0 ? '8px #F93B6A solid' : (data.blockFraction === -0.5 ? '8px #F93B6A solid' : '')}
                bg='lightGrey'
                mx='1rem'
            >
            </Card>
        )

        // Timeline, which is used to assign a fraction to the setBlock, doing swipe to the sides
        const timeLine = (
            <Card
                height='20px'
                width='220px'
                borderRadius='5px'
                depth={9}
                bg='lightGrey'
                mx='1rem'
                className='swipeItem'
                style={{
                    borderRight: widthRight + 'px #F93B6A solid',
                    borderLeft: widthLeft + 'px #F93B6A solid',
                    transition: 'border-width 250ms ease-in-out'
                }}
                onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
                onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
                onTouchEnd={() => this.handleTouchEnd()}
                // The following event handlers are for mouse compatibility:
                onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
                onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}
                onMouseUp={() => this.handleMouseUp()}
                onMouseLeave={() => this.handleMouseLeave()}
                // Event to manage oneTap in the timeLine
                onClick={() => this.handleTap()}
            >
            </Card>
        )

        return (
            <Flex column center className='SetBlock' m='auto'>
                <Flex row center>
                    {!editMode && tinyBlocks}
                    <Text
                        weight='600'
                        aling='center'
                        mb='5px'
                    >
                        {data.blockTime}
                    </Text>
                </Flex>
                <Flex column>
                    {!editMode && ( // If is editMode is not necessary show the description
                        <Text
                            align='center'
                            my='0px'
                            mx='1rem'
                        >
                            {data.description}
                        </Text>
                    )}
                    {editMode && ( // Icon to set/edit description and issueURL
                        <Flex row>
                            {React.createElement(Edit3, {
                                size: 24,
                                color: 'black',
                                onClick: () => console.log('Click in Edit - Open dialog to set description and issueURL')
                            })}
                            { //Timeline where you can swipe and tap to set the blockFraction
                                timeLine
                            }
                        </Flex>
                    )}
                </Flex>
            </Flex>
        );
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        ...environment
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SetBlock);
