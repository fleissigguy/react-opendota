import * as React from 'react';
import './style.scss';
import {TagCloud} from "react-tagcloud";
import PropTypes from 'prop-types';
import {AsyncComponent} from '../../utils/AsyncComponentLoader';

const overview = () => import(/* webpackMode: "lazy", webpackChunkName: "player-overview" */ './views/Overview');
const heroes = () => import(/* webpackMode: "lazy", webpackChunkName: "player-heroes" */ './views/Heroes');
const histograms = () => import(/* webpackMode: "lazy", webpackChunkName: "player-histograms" */ './views/Histograms');
const matches = () => import(/* webpackMode: "lazy", webpackChunkName: "player-matches" */ './views/Matches');
const peers = () => import(/* webpackMode: "lazy", webpackChunkName: "player-peers" */ './views/Peers');
const rankings = () => import(/* webpackMode: "lazy", webpackChunkName: "player-rankings" */ './views/Rankings');
const records = () => import(/* webpackMode: "lazy", webpackChunkName: "player-records" */ './views/Records');
const totals = () => import(/* webpackMode: "lazy", webpackChunkName: "player-totals" */ './views/Totals');
const trends = () => import(/* webpackMode: "lazy", webpackChunkName: "player-trends" */ './views/Trends');
const wardmap = () => import(/* webpackMode: "lazy", webpackChunkName: "player-wardmap" */ './views/Wardmap');


export namespace PlayerTabsContent {
  export interface Props {
    playerId: number
  }
}
export default class PlayerTabsContent extends React.Component<PlayerTabsContent.Props> {

  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
    super(props);
  }

  render() {
    const parsedPath = this.context.router.route.location.pathname.split('/');
    if(parsedPath[1] !== "player"){
      return null;
    }
    switch(parsedPath[parsedPath.length-1]){
      case 'overview':
        return <AsyncComponent moduleProvider={overview}/>;
      case 'heroes':
        return <AsyncComponent moduleProvider={heroes}/>;
      case 'histograms':
        return <AsyncComponent moduleProvider={histograms}/>;
      case 'matches':
        return <AsyncComponent moduleProvider={matches}/>;
      case 'peers':
        return <AsyncComponent moduleProvider={peers}/>;
      case 'rankings':
        return <AsyncComponent moduleProvider={rankings}/>;
      case 'records':
        return <AsyncComponent moduleProvider={records}/>;
      case 'totals':
        return <AsyncComponent moduleProvider={totals}/>;
      case 'overview':
        return <AsyncComponent moduleProvider={overview}/>;
      case 'overview':
        return <AsyncComponent moduleProvider={overview}/>;
      default:{
        const playerRouteIndex = parsedPath.indexOf('player');
        this.context.router.history.push(`/player/${parsedPath[playerRouteIndex+1]}/overview`);
        return null;
      }
    }
  }
}
