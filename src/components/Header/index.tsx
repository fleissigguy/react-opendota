import * as React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './style.scss';

const classNames = require('classnames');

export namespace Header {
  export interface Props {
  }
}

export class Header extends React.Component<Header.Props> {

  state = {
    navigationShowed: false
  };
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props?: Header.Props, context?: any) {
    super(props, context);
    this.showHideNavigation = this.showHideNavigation.bind(this);
  }

  showHideNavigation(e){
    e.preventDefault();
    this.setState({navigationShowed: !this.state.navigationShowed});
  }

  render() {
    return (
      <header className={`header ${this.state.navigationShowed && 'nav-showed'} ${this.context.router.route.location.pathname == '/' && 'root-page'}`}>
        <div className='menu-button' onClick={this.showHideNavigation}>
          <span className='menu-button-bar'/>
          <span className='menu-button-bar'/>
          <span className='menu-button-bar'/>
        </div>
        <div className="menu-button-after"/>
        <h1 className='title'>MOBA</h1>
        <div className='routes' onClick={this.showHideNavigation}>
          <NavLink className='router-link' exact={true} activeClassName='router-link--active' to="/">home</NavLink>
          <NavLink className='router-link' activeClassName='router-link--active' to="/game">game</NavLink>
          <NavLink className='router-link' activeClassName='router-link--active' to="/settings">settings</NavLink>
        </div>
      </header>
    );
  }
}


