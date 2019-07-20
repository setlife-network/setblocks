import React from 'react';
import { connect } from 'react-redux';
import { Edit3 } from 'styled-icons/feather/Edit3.cjs'

import Box from './Box';
import Card from './Card';
import Flex from './Flex';
import Modal from './Modal';
import Input from './Input';
import Text from './Text';

import theme from '../styles/theme'

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
        beingMoved: false,
        widthRight: 0,
        widthLeft: 0,
        toggled: false,
        descriptionUnsaved: '',
        issueUrlUnsaved: ''
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
            originalOffset: 0,
            velocity: 0,
            timeOfLastDragEvent: 0,
            touchStartX: 0,
            prevTouchX: 0,
            beingTouched: true,
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
            originalOffset: 0,
            velocity: 0,
            timeOfLastDragEvent: 0,
            touchStartX: 0,
            prevTouchX: 0,
            beingTouched: true,
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
            } else if (deltaX > 50 && deltaX < 100) {
                this.handleRightSwipe();
            } else {
                this.setState({
                    left: deltaX,
                    velocity,
                    timeOfLastDragEvent: currTime,
                    prevTouchX: touchX,
                    beingMoved: true
                });
            }
        }
    }

    handleEnd() {
        const { velocity } = this.state;
        this.setState({
            left: 0,
            velocity: velocity,
            touchStartX: 0,
            beingTouched: false,
            beingMoved: false
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
        _.delay(this.handleEnd.bind(this), 500);
    }

    handleMouseLeave() {
        this.handleMouseUp();
    }

    handleTap() {
        const { updateSetBlock } = this.props;
        const { data, beingMoved } = this.state;
        if (!beingMoved) {
            // If the blockFraction is 0, set in 1, if not set in 0.
            const newBlockFraction = data.blockFraction === 0 ? 1 : 0
            updateSetBlock({ ...data, blockFraction: newBlockFraction });
            this.setState({
                data: {
                    ...data,
                    blockFraction: newBlockFraction
                },
                widthLeft: newBlockFraction * 110,
                widthRight: newBlockFraction * 110,
                beingTouched: false
            });
        }
    }

    editDialog = () => {
        const {
            toggled, data, issueUrlUnsaved, descriptionUnsaved 
        } = this.state
        const onToggle = () => {
            this.setState(prevState => ({
                toggled: !prevState.toggled,
                descriptionUnsaved: prevState.data.description,
                issueUrlUnsaved: prevState.data.issueUrl,
            }));
        }
        const onReady = () => {
            const { updateSetBlock } = this.props
            const { data, issueUrlUnsaved, descriptionUnsaved } = this.state
            const dataToSave = { ...data, description: descriptionUnsaved, issueUrl: issueUrlUnsaved }
            this.setState({ data: { ...dataToSave } }) // Save in the data state, only when press Ready
            updateSetBlock({ ...dataToSave }) // Save in the parent component state, only when press Ready
            onToggle()
        }
        const handleDescriptionChange = (event) => {
            const description = event.target.value
            this.setState({
                descriptionUnsaved: description
            })
        }
        const handleIssueChange = (event) => {
            const issueUrl = event.target.value
            this.setState({
                issueUrlUnsaved: issueUrl
            })
        }

        return (
            <>
                {
                    React.createElement(Edit3, {
                        size: 24,
                        color: data.description || data.issueUrl ? theme.colors.accent : theme.colors.secondaryDark,
                        onClick: onToggle
                    })
                }
                <Modal opened={toggled} onClose={onToggle}>
                    <Box p='2rem'>
                        <Flex column center>
                            <Text
                                weight='600'
                                aling='center'
                                mb='5px'
                            >
                                {data.blockTime}
                            </Text>

                            <Text mb='0'>
                                {'What issues are you going to work on?'}
                            </Text>
                            <Input textArea value={descriptionUnsaved || ''} onChange={handleDescriptionChange} />

                            <Text mb='0'>
                                {'Issue URL: '}
                            </Text>
                            <Input textArea={false} value={issueUrlUnsaved || ''} onChange={handleIssueChange} />

                            <Card
                                bg='secondary'
                                minWidth='20%'
                                maxWidth='100px'
                                height='40px'
                                mx='auto'
                                mt='2rem'
                                borderRadius='3px'
                                depth={7}
                                onClick={onReady}
                            >
                                <Text color='textSecondary' align='center' size='1rem' weight='600' mt='8px' mx='5px'>
                                    {'Ready'}
                                </Text>
                            </Card>
                        </Flex>
                    </Box>
                </Modal>
            </>
        )
    }

    handleFund = () => {
        console.log(this.props)
        if (this.props.data.funded) {
            this.props.goToStreamPage(this.props.data.id)
        } else {
            this.props.goToPaymentPage(this.props.data.id)
        }
    }

    render() {
        const { editMode } = this.props;
        const { widthRight, widthLeft, data } = this.state;

        //Square that represents the fraction of time allocated in the setBlock, in readOnly mode
        const tinyBlocks = (
            <Card
                height='70px'
                width='10px'
                borderBottom={data.blockFraction === 1.0 ? `35px ${theme.colors.accent} solid` : (data.blockFraction === 0.5 ? `35px ${theme.colors.accent} solid` : '')}
                borderTop={data.blockFraction === 1.0 ? `35px ${theme.colors.accent} solid` : (data.blockFraction === -0.5 ? `35px ${theme.colors.accent} solid` : '')}
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
                bg='secondaryLight'
                mx='1rem'
                className='swipeItem'
                style={{
                    borderRight: widthRight + `px ${theme.colors.accent} solid`,
                    borderLeft: widthLeft + `px ${theme.colors.accent} solid`,
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
            <Flex row width='100%' mt='1rem' onClick={this.handleFund}>
                <Flex column center className='SetBlock'>
                    <Flex row center width='100%'>
                        <Text
                            weight='600'
                            aling='center'
                            size={editMode ? 15 : 20}
                            mt='10px'
                            mb='5px'
                            ml='1rem'
                            mr='auto'
                        >
                            {(data.blockTime && !editMode) ? data.blockTime.split('(')[1].slice(0, -1) : data.blockTime}
                        </Text>
                    </Flex>
                    <Flex column width='100%'>
                        {!editMode && ( // If is editMode is not necessary show the description
                            <Text
                                align='left'
                                my='0px'
                                ml='1rem'
                            >
                                {data.description || 'You haven´t planed anything for this block' }
                            </Text>
                        )}
                        {editMode && ( // Icon to set/edit description and issueURL
                            <Flex row ml='0.5rem'>
                                {
                                    this.editDialog()
                                }
                                { //Timeline where you can swipe and tap to set the blockFraction
                                    timeLine
                                }
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                {!editMode && (<Flex center ml='auto'>{tinyBlocks}</Flex>)}
            </Flex>
        );
    }
}

const mapStateToProps = ({ environment, team, scheduling }) => {
    return {
        ...environment,
        ...scheduling,
        ...team
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SetBlock);
