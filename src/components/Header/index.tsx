import * as React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './style.scss';
import { NavigationButton } from '../NavigationButton/index';

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

  showHideNavigation(){
    this.setState({navigationShowed: !this.state.navigationShowed});
  }

  render() {
    return (
      <header className={`header ${this.state.navigationShowed && 'nav-showed'} ${this.context.router.route.location.pathname == '/' && 'root-page'}`}>
        <NavigationButton handler={this.showHideNavigation} />
        <h1 className='title'>{'<OPENDOTA/>'}</h1>
        <div className='routes' onClick={this.showHideNavigation}>
          <NavLink className='router-link' exact={true} activeClassName='router-link--active' to="/">Главная</NavLink>
          <NavLink className='router-link' activeClassName='router-link--active' to="/search">Поиск</NavLink>
          <NavLink className='router-link' activeClassName='router-link--active' to="/game">Статистика</NavLink>
          <NavLink className='router-link' activeClassName='router-link--active' to="/settings">Настройки</NavLink>
        </div>
      </header>
    );
  }
}


