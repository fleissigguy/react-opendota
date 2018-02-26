import * as React from 'react';
import * as PlayerActions from '../../actions/player';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { RouteComponentProps } from 'react-router';
import { autobind } from 'core-decorators';


export namespace Player {
  export interface Props extends RouteComponentProps<void> {
    player: PlayerStoreState;
    actions: typeof PlayerActions;
  }

  export interface State {
    hideModalTrigger: boolean
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Player extends React.Component<Player.Props, Player.State> {
  state = {
    hideModalTrigger: false
  };
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.body.classList.add('rescale-background');
    const playerId = this.context.router.route.location.pathname.split('/player/')[1];
    if (playerId) {
      this.props.actions.getFullPlayer(+playerId);
    } else {
      this.context.router.goBack();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hideModalTrigger && this.state.hideModalTrigger) {
      this.context.router.history.goBack()
    }
  }

  @autobind()
  closeModal(e) {
    e.preventDefault();
    this.setState({hideModalTrigger: true});
  }

  componentWillUnmount(){
    document.body.classList.remove('rescale-background');
  }

  render() {
    const {
      shortPlayer,
      fullPlayer,
      loading,
      wl,
      completed
    } = this.props.player;
    const fullPlayerLoaded = !loading && completed;
    if (!loading && !fullPlayer) {
      return null;
    }
    const percentWins:number = +(wl.win / (wl.win + wl.lose) * 100).toFixed(2);
    return (
      <div className={`modal player ${this.state.hideModalTrigger && 'hide'}`}>
        <button className="close-modal-button" onClick={this.closeModal}>
          <span className='button-bar'/>
          <span className='button-bar'/>
        </button>
        {fullPlayerLoaded ?
          fullPlayer.profile ?
            <div className="main-player-info">
              <div className="left-side-info">
                <img src={fullPlayer.profile.avatarfull} alt="" className="player-avatar"/>
              </div>
              <div className="right-side-info">
                <div className="short-info">
                  <label className="player-name">{fullPlayer.profile.name || fullPlayer.profile.personaname}</label>
                  <label className="account-id">{fullPlayer.profile.account_id}</label>
                </div>
                <div className="wl">
                  <label className="percent" style={{
                    background:`hsl(${percentWins*1.2+(percentWins>49?2:0)},${22 + percentWins/10}%,${28 + percentWins/5}%)`,
                    color:`hsl(${percentWins*1.2+(percentWins>49?2:0)},${22 + percentWins/10}%,89%)`
                  }}>{percentWins}</label>
                  <label className="wins">{wl.win}</label>
                  <label className="loses">{wl.lose}</label>
                </div>
                <div className="mmr">
                  {fullPlayer.solo_competitive_rank && <label className="solo">{fullPlayer.solo_competitive_rank}</label>}
                  {fullPlayer.competitive_rank && <label className="party">{fullPlayer.competitive_rank}</label>}
                  {fullPlayer.mmr_estimate.estimate &&
                  <label className="estimated">{fullPlayer.mmr_estimate.estimate}</label>}
                </div>
              </div>
            </div>
            :
            <div className="player-not-found">
              Такого пользователя не существует
            </div>
          :
          <div className="full-player-loading">Основная информация по игроку загружается...</div>}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PlayerActions as any, dispatch)
  }
}
