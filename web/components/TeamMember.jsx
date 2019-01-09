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
                        mb='2rem'
                        width='100%'
                        height='60px'
                        onClick={goToPage}
                    >
                        <Card
                            width='10px'
                            height='10px'
                            bg={color}
                            borderRadius={50}
                            my='auto'
                            ml='20%'
                        />
                        <Text
                            color='textSecondary'
                            size='1rem'
                            weight='600'
                            ml='15%'
                        >
                            {name}
                        </Text>
                    </Flex>
                </Card>
            </>
        );
    }
}
