import * as React from 'react';
import './style.scss';

export namespace NavigationButton {
  export interface Props {
    handler: Function
  }
}

export class NavigationButton extends React.Component<NavigationButton.Props> {

  constructor(props?: NavigationButton.Props) {
    super(props);
    this.showHideNavigation = this.showHideNavigation.bind(this);
  }

  showHideNavigation(e){
    e.preventDefault();
    this.props.handler();
  }

  render() {
    return (
      <div>
        <div className='menu-button' onClick={this.showHideNavigation}>
          <span className='menu-button-bar'/>
          <span className='menu-button-bar'/>
          <span className='menu-button-bar'/>
        </div>
        <div className="menu-button-after"/>
      </div>
    );
  }
}


