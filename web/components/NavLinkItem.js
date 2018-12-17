import React from 'react'
import { Link } from 'react-router-dom'
import Box from './Box'
import Flex from './Flex'
import Text from './Text'
import Icon from './Icon';
import Card from './Card';

export default ({
    text, selected, icon, route, width
}) => (
    <Box
        display='inline-flex'
        width={width + '%'}
    >
        <Card
            onClick={() => {
            }}
            bg={selected ? 'black' : 'grey'}
            width='100%'
            borderLeft='2px solid black'
            borderRight='2px solid black'
        >
            <Link
                to={route}
                style={{ textDecoration: 'none' }}
            >
                <Card
                    bg='black'
                    mx='50%'
                    mt='5%'
                    depth={6}
                >
                    <Flex
                        direction={['column', 'column', 'row']}
                        alignItems='center'
                        pl={[0, 0, '1rem']}
                        flex={1}
                    >
                        <Icon
                            faIconName={icon} 
                            size='5x'
                            color={selected ? 'white' : 'black'}
                        />
                        <Text
                            color={selected ? 'white' : 'black'}
                            mt={['4px', '4px', 0]}
                            ml={[0, 0, '1rem']}
                            size={[10, 10, 14]}
                            weight='600'
                        >
                            {text}
                        </Text>
                    </Flex>
                </Card>
            </Link>
        </Card>
    </Box>
)