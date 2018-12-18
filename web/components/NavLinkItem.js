import React from 'react'
import { Link } from 'react-router-dom'

import Box from './Box'
import Flex from './Flex'
import Text from './Text'
import Card from './Card';

export default ({
    text, selected, icon, route, width
}) => (
    <Box
        width={width + '%'}
    >
        <Link
            to={route}
            style={{ textDecoration: 'none' }}
        >
            <Card
                bg='white'
                width='100%'
                height='100%'
                borderTop={selected ? '2px green solid' : ''}
                depth={8}
            >
                <Flex
                    column
                    height='100%'
                    py='5px'
                    alignItems='center'
                >
                    {React.createElement(icon, {
                        size: 24,
                        color: selected ? 'green' : 'black'
                    })}
                    <Text
                        color={selected ? 'green' : 'black'}
                        size={[10]}
                        my='0'
                        weight='600'
                    >
                        {text}
                    </Text>
                </Flex>
            </Card>
        </Link>
    </Box>
)