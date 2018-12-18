import React from 'react';
import moment from 'moment';
import ScheduleHeader from './ScheduleHeader';
import SideBar from './SideBar';
import Flex from './Flex';
import SetBlock from './SetBlock';
import Text from './Text';

export default class SchedulePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            daysOfWeek: [],
            selectedDay: moment.now(),
            setBlocks: [{
                id: '1',
                date: '12/12/18',
                blockTime: 'Setblock 1 (12am - 4am)',
                blockFraction: '1.0',
                issueUrl: 'http://issueURL',
                description: 'A mocked setBlock',
                teamMember: '',
            }, {
                id: '2',
                date: '13/12/18',
                blockTime: 'Setblock 2 (4:30am - 8:30am)',
                blockFraction: '0.5',
                issueUrl: 'http://issue2URL',
                description: 'A mocked setBlock2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus metus, scelerisque id nisl nec, ',
                teamMember: '',
            }
            ]
        }
    }
    
    componentDidMount(
    ) {
        this.getDaysOfWeek()
    }

    renderBaseOnParams = () => {
        const { setBlocks } = this.state;
        return setBlocks.map(setBlock => {
            return <SetBlock data={setBlock} key={setBlock.id} />
        })
    }

    goToScheduleDay = (day) => {
        const { history, match } = this.props;
        if (match.params.teamMemberId) {
            history.push('/team/' + match.params.teamMemberId + '/' + day.getDay());
        } else {
            // If the match.params don't have a teamMemberId are u seeing your schedule
            history.push('/schedule/' + day.getDay());
        }
        this.setState({ selectedDay: day })
    }

    getDaysOfWeek = () => {
        const startOfWeek = moment()
        .startOf('isoWeek');
        const endOfWeek = moment()
        .endOf('isoWeek');

        const days = [];
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(day.toDate());
            day = day.clone()
            .add(1, 'd');
        }

        this.setState({
            daysOfWeek: days,
            selectedDay: days[0]
        })
    }

    render() {
        const { match } = this.props;
        const { daysOfWeek, selectedDay } = this.state;
        return (
            <Flex
                row
                flexDirection='horizontal'
                width='100%'
                className='SchedulePage'
            >
                <Flex row>
                    <SideBar
                        days={daysOfWeek}
                        selectedDay={selectedDay}
                        goToScheduleDay={this.goToScheduleDay}
                    />
                </Flex>
                <Flex
                    column
                    width='100%'
                >
                    <Flex
                        bg='red'
                        center
                    >
                        <ScheduleHeader selectedDay={selectedDay} />
                    </Flex>
                    <Flex
                        center
                        column
                    >
                        <Text
                            weight='900'
                            aling='center'
                            style={{ borderBottom: '1px solid red' }}
                        >
                            { // TODO Print the name of the team member
                                match.params.teamMemberId ? 'Team Member ' : 'Your '
                            }

                            Schedule's Page
                        </Text>
                        {this.renderBaseOnParams(match)}
                    </Flex>
                </Flex>
            </Flex>
        );
    }
}
