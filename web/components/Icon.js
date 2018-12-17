import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Icon extends React.Component {
    render() {
        const {
            onClick, faIconName, size, color = 'white'
        } = this.props;
        return (
            <div
                className={'Icon ' + faIconName}
                onClick={onClick}
                style={{ color: color }}
            >
                <FontAwesomeIcon
                    icon={faIconName}
                    size={size}
                />
            </div>
        )
    }
}

Icon.defaultProps = {
    size: 'lg'
}
