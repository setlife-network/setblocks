import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'

const StyledInput = styled.input.attrs({
    type: 'text'
})`
    ${is('disabled')`

    `}
`

const Input = ({
    // field, // { name, value, onChange, onBlur }
    // form: { touched, errors },
    ...props
}) => (
    <div>
        <StyledInput
            // {...field}
            {...props}
        />
    </div>
)

Input.propTypes = {
    // field: PropTypes.object.isRequired,
    // form: PropTypes.object.isRequired
}

export default Input