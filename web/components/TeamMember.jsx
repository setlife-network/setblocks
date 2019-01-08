import React from 'react';

import Card from './Card';
import Flex from './Flex';
import Image from './Image';
import Text from './Text';


export default class TeamMember extends React.Component {
    render() {
        const { goToPage, name, color } = this.props;
        return (
            <>
                <Card
                    bg='backgroundSecondary'
                    width='95%'
                    minWidth='20%'
                    maxWidth='530px'
                    height='60px'
                    mx='auto'
                    mt='1rem'
                    depth={7}
                >
                    <Flex
                        direction='row'
                        justifyContent='space-evenly'
                        mb='2rem'
                        width='100%'
                        height='50px'
                        onClick={goToPage}
                    >
                        <Card
                            width='10px'
                            height='10px'
                            bg={color}
                            borderRadius={50}
                            my='auto'
                        />
                        <Text
                            color='textSecondary'
                            size='1rem'
                            weight='600'
                        >
                            {name}
                        </Text>

                        <Image
                            my='auto'
                            height='20px'
                            src={require('../images/SettingsIcon.png')}
                        />
                    </Flex>
                </Card>
            </>
        );
    }
}
