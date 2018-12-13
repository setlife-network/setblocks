import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class Icon extends React.Component {
    render() {
        const { onClick, faIconName, size } = this.props;
        return (
            <div
                className={'Icon ' + faIconName}
                onClick={onClick}
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
