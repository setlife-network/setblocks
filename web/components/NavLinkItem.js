import React from 'react'
import { Link } from 'react-router-dom'
import Box from './Box'
import Flex from './Flex'
import Text from './Text'

export default ({ text, selected, icon, route }) => (
    <Link to={route}>
        <Flex
            nowrap
            color={selected ? 'blue' : 'charcoal'}
            height={60}
        >
            <Box
                width='4px'
                height='100%'
                bg={selected ? 'blue' : 'transparent'}
            />
            <Flex
                direction={['column', 'column', 'row']}
                alignItems='center'
                pl={[0, 0, '1rem']}
                flex={1}
            >
                {React.createElement(icon, {
                    size: 24
                })}
                <Text
                    color={selected ? 'blue' : 'charcoal'}
                    mt={['4px', '4px', 0]}
                    ml={[0, 0, '1rem']}
                    size={[10, 10, 14]}
                >
                    {text}
                </Text>
            </Flex>
        </Flex>
    </Link>
)