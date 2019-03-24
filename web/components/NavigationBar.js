import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'

import NavLinkItem from './NavLinkItem';

import { NAVIGATION } from '../constants';
import Flex from './Flex';

export class NavigationBar extends React.Component {
    renderNavItem = (item) => {
        const { path } = this.props;
        const route = '/' + _.split(path, '/', 2)[1];
        return (
            <NavLinkItem
                {...item}
                selected={item.route === route}
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
