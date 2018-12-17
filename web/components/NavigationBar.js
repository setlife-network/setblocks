import React from 'react';
import { connect } from 'react-redux';

import NavLinkItem from './NavLinkItem';

import { NAVIGATION } from '../constants';
import Flex from './Flex';

class NavigationBar extends React.Component {
    renderNavItem = (item) => {
        const { path } = this.props;
        return (
            <NavLinkItem
                {...item}
                selected={item.route === path}
                width={100 / NAVIGATION.items.length}
            />
        )
    }

    render() {
        return (
            <Flex
                className='NavigationBar'
                width='100%'
            >
                <Flex
                    className='nav-container'
                    width='100vw'
                >
                    {NAVIGATION.items.map(this.renderNavItem)}
                </Flex>
            </Flex>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
