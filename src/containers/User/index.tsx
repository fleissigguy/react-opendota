import * as React from 'react';
import * as UserActions from '../../actions/user';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { RouteComponentProps } from 'react-router';
import { autobind } from 'core-decorators';


export namespace User {
  export interface Props extends RouteComponentProps<void> {
    user: UserStoreState;
    actions: typeof UserActions;
  }

  export interface State {
    hideModalTrigger: boolean
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class User extends React.Component<User.Props, User.State> {
  state = {
    hideModalTrigger: false
  };
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hideModalTrigger && this.state.hideModalTrigger) {
      setTimeout(this.context.router.history.goBack, 800);
    }
  }

  @autobind()
  closeModal(e) {
    e.preventDefault();
    this.setState({hideModalTrigger: true});
  }

  render() {
    const {
      account_id,
      avatarfull,
      personaname,
      last_match_time
    } = this.props.user.shortUser;
    return (
      <div className={`modal user ${this.state.hideModalTrigger && 'hide'}`}>
        <img src={avatarfull} alt="" className="user-photo"/>
        <label className="user-name">{personaname}</label>
        <label className="last-match-time">{last_match_time}</label>
        <label className="account-id">{account_id}</label>
        <button className="close-modal-button" onClick={this.closeModal}>
          <span className='button-bar'/>
          <span className='button-bar'/>
        </button>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions as any, dispatch)
  }
}
