import React from 'react';

import Flex from './Flex';
import Text from './Text';
import Card from './Card';
import Image from './Image';

export default class TeamMember extends React.Component {
    render() {
        const { goToPage, name, color } = this.props;
        return (
            <>
                <Card
                    bg={color}
                    borderRadius={5}
                    width='70%'
                    minWidth='20%'
                    maxWidth='530px'
                    height='30px'
                    mx='auto'
                    my='1rem'
                    depth={7}
                >
                    <Flex
                        direction='row'
                        justifyContent='space-between'
                        mb='2rem'
                        width='100%'
                        height='50px'
                        onClick={goToPage}
                    >
                        <Text
                            color='black'
                            ml='0.75rem'
                            mt='0.25rem'
                            size='1rem'
                            weight='600'
                        >
                            {name}
                        </Text>

                        <Card
                            mr='10%'
                            mt='0.38rem'
                        >
                            <Image

                                height='20px'
                                src={require('../images/SettingsIcon.png')}
                            />
                        </Card>
                    </Flex>
                </Card>
            </>
        );
    }
}
