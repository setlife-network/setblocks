import React from 'react';

export default class SchedulePage extends React.Component {
    renderBaseOnParams = (match) => {
        if (match.params.teamMemberId) {
            return (
                <h6>
                teamMemberId:
                    {match.params.teamMemberId}
                </h6>
            )
        }

        if (match.params.dayOfWeek) {
            return (
                <h6>
                    dayOfWeek:
                    {match.params.dayOfWeek}
                </h6>
            )
        }
    }

    render() {
        const { match } = this.props;
        return (
            <div className='SchedulePage'>
                <h6>SchedulePage</h6>
                {this.renderBaseOnParams(match)}
            </div>
        );
    }
}
