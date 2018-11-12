import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class Icon extends React.Component {
    render() {
        return (
            <div
                className={'Icon ' + this.props.faIconName}
                onClick={this.props.onClick}
            >
                <FontAwesomeIcon
                    icon={this.props.faIconName}
                    size={this.props.size}
                />
            </div>
        )
    }
}

Icon.defaultProps = {
    size: 'lg'
}
