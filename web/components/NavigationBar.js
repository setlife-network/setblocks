import React from 'react';
import { connect } from 'react-redux';

import NavLinkItem from './NavLinkItem';

import { NAVIGATION } from '../constants';

class NavigationBar extends React.Component {
    renderNavItem = (item) => {
        return (
            <NavLinkItem {...item}/>
        )
    }
    render() {
        return (
            <div className='NavigationBar'>
                <div className='logo-container'>
                    <div className='logo'/>
                </div>
                <div className='nav-container'>
                    {NAVIGATION.items.map(this.renderNavItem)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
