import * as React from 'react';
import * as PlayerActions from '../../actions/player';
import './style.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Route, RouteComponentProps} from 'react-router';
import {autobind} from 'core-decorators';
import PlayerWordCloud from "../../components/PlayerWordCloud";
import PageInformer from "../../utils/PageInformer";
import {AsyncComponent} from "../../utils/AsyncComponentLoader";
import * as ReactDOM from 'react-dom';
import PlayerNavigation from "./components/PlayerNavigation";
import {Header} from "../../components/Header";




export namespace Player {
  export interface Props extends RouteComponentProps<void> {
    player: PlayerStoreState;
    actions: typeof PlayerActions;
    children: any;
  }

  export interface State {
    hideModalTrigger: boolean;
    activeTab: string;
    activeTabContent: any;
  }
}

@connect(mapStateToProps, mapDispatchToProps, null, {pure:false})
export default class Player extends React.Component<Player.Props, Player.State> {
  historyUnlistener: Function;
  state = {
    hideModalTrigger: false,
    activeTab: 'overview',
    activeTabContent: null
  };
  pageInfoUpdated: boolean = false;
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.body.classList.add('rescale-background');
    PageInformer.setPageInfo('Игрок', 'Нет информации');
    if (!this.getFullPlayer(this.context.router.route.location)) {
      this.context.router.goBack();
    }
  }

  @autobind()
  getFullPlayer(location) {
    const playerId = this.getPlayerIdFromLocation(location);
    if (playerId) {
      this.props.actions.getFullPlayer(playerId);
    }
    return !!playerId;
  }

  componentWillReceiveProps(nextProps) {
  }


  getPlayerIdFromLocation(location) {
    const parsedPathname = location.pathname.split('/');
    return +parsedPathname[parsedPathname.indexOf('player') + 1];
  }


  componentDidUpdate() {
    if (!this.pageInfoUpdated && this.props.player.fullPlayer && this.props.player.fullPlayer.profile) {
      if (this.props.player.fullPlayer.profile.account_id === this.getPlayerIdFromLocation(this.context.router.route.location)) {
        this.pageInfoUpdated = true;
        PageInformer.setPageInfo(this.props.player.fullPlayer.profile.personaname,
          this.props.player.fullPlayer.profile.account_id);
      }
    }
  }

  @autobind()
  closeModal(e) {
    e.preventDefault();
    this.context.router.history.push('/'+Header.PreviousRoute + Header.PreviousRouteQuery);
  }

  componentWillUnmount() {
    document.body.classList.remove('rescale-background');
  }

  static WLInfo({wl}) {
    const gamesCount = wl.win + wl.lose;
    const percentWins: number = !(wl.win + wl.lose) ? 0.00 : +(wl.win / gamesCount * 100).toFixed(2);
    // const percentWins: number = 56;
    const isGoodPlayer = percentWins > 60 && gamesCount > 2000;
    const colorStep = percentWins < 49 ? 1.2 : 1.8;
    return (
      <div className="wl">
        <label className="percent" style={{
          background: isGoodPlayer ? 'rgb(139, 123, 228)' : `hsl(${percentWins * colorStep},${22 + (percentWins < 49 ? (percentWins / 10) : (percentWins / 5))}%,${28 + percentWins / 5}%)`,
          color: `hsl(${percentWins * colorStep},${22 + percentWins / 10}%,89%)`,
          boxShadow: isGoodPlayer ? '0 0 13px 2px rgb(90, 72, 184)' : (percentWins > 55 && gamesCount > 600) ? `0 0 13px 2px hsl(${percentWins * colorStep},${22 + percentWins / 10}%,30%)` : 'none'
        }}>{percentWins + '%'}</label>
        <label className="wins">{wl.win}</label>
        <label className="loses">{wl.lose}</label>
      </div>
    )
  }


  static MMR(props) {
    return (
      <div className="mmr">
        {props.solo &&
        <label className="solo">{props.solo}</label>}
        {props.party &&
        <label className="party">{props.party}</label>}
        {props.estimate.estimate &&
        <label className="estimated">{props.estimate.estimate}</label>}
      </div>
    )
  }

  @autobind
  handleTabClick(pathname) {
    this.context.router.history.push(`${this.context.router.route.location.pathname}/${pathname}`)
  }

  render() {
    const {
      fullPlayer,
      loading,
      wl,
      completed
    } = this.props.player;
    const fullPlayerLoaded = !loading && completed;
    if (!loading && !fullPlayer && !wl) {
      return null;
    }
    return (
      <div className={`modal player ${this.state.hideModalTrigger && 'hide'}`}>
        <button className="close-modal-button" onClick={this.closeModal}>
          <span className='button-bar'/>
          <span className='button-bar'/>
          <span className='button-bar'/>
        </button>
        {fullPlayerLoaded && fullPlayer.profile &&
        <PlayerWordCloud playerId={fullPlayer.profile.account_id}/>}
        {fullPlayerLoaded ?
          fullPlayer.profile ?
            <div className='player-info'>
              <div className="main-player-info">
                <div className="left-side-info">
                  <img src={fullPlayer.profile.avatarfull} alt="" className="player-avatar"/>
                </div>
                <div className="right-side-info">
                  <div className="short-info">
                    <label
                      className={`player-name ${fullPlayer.profile.name && 'famous'}`}>{fullPlayer.profile.name || fullPlayer.profile.personaname}</label>
                    {fullPlayer.profile.name &&
                    <label className="player-name persona">{fullPlayer.profile.personaname}</label>}
                  </div>
                  <Player.WLInfo wl={wl}/>
                  <Player.MMR solo={fullPlayer.solo_competitive_rank} party={fullPlayer.competitive_rank}
                              estimate={fullPlayer.mmr_estimate}/>
                </div>
              </div>
              <PlayerNavigation playerId={fullPlayer.profile.account_id}/>
            </div>
            :
            <div className="player-not-found">
              Такого пользователя не существует
            </div>
          :
          <div className="full-player-loading"/>}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    player: state.player,
    ...props
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PlayerActions as any, dispatch)
  }
}

/*

                <NavLink to={`/player/${fullPlayer.profile.account_id}/overview`} activeClassName='active'>
                  <img src="../../assets/icons/overview.png" alt=""/>
                </NavLink>
                <NavLink to={`/player/${fullPlayer.profile.account_id}/matches`} activeClassName='active'><img
                  src="../../assets/icons/match.svg" alt=""/></NavLink>
                <NavLink to={`/player/${fullPlayer.profile.account_id}/heroes`} activeClassName='active'><img
                  src="../../assets/icons/helmet.png" alt=""/></NavLink>
                <NavLink to={`/player/${fullPlayer.profile.account_id}/peers`} activeClassName='active'><img
                  src="../../assets/icons/peer.svg" alt=""/></NavLink>
                <NavLink to={`/player/${fullPlayer.profile.account_id}/records`} activeClassName='active'><img
                  src="../../assets/icons/record.svg" alt=""/></NavLink>
                <NavLink to={`/player/${fullPlayer.profile.account_id}/totals`} activeClassName='active'><img
                  src="../../assets/icons/totals.svg" alt=""/></NavLink>
                <NavLink to={`/player/${fullPlayer.profile.account_id}/histograms`} activeClassName='active'><img
                  src="../../assets/icons/histogram.png " alt=""/></NavLink>
                <NavLink to={`/player/${fullPlayer.profile.account_id}/trends`} activeClassName='active'><img
                  src="../../assets/icons/trends.png" alt=""/></NavLink>
                <NavLink to={`/player/${fullPlayer.profile.account_id}/wardmap`} activeClassName='active'><img
                  src="../../assets/icons/ward.svg" alt=""/></NavLink>
                <NavLink to={`/player/${fullPlayer.profile.account_id}/rankings`} activeClassName='active'><img
                  src="../../assets/icons/ranking.svg" alt=""/></NavLink>
 */
