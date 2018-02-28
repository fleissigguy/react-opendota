import * as React from "react";
import {NavLink} from "react-router-dom";
import {Route, Switch} from 'react-router';
import {AsyncComponent} from "../../../../utils/AsyncComponentLoader";

const tabsContent = {
  overview: () => import(/* webpackMode: "lazy", webpackChunkName: "player-overview" */ '../../../../components/PlayerTabsContent/views/Overview'),
  heroes: () => import(/* webpackMode: "lazy", webpackChunkName: "player-heroes" */ '../../../../components/PlayerTabsContent/views/Heroes'),
  histograms: () => import(/* webpackMode: "lazy", webpackChunkName: "player-histograms" */ '../../../../components/PlayerTabsContent/views/Histograms'),
  matches: () => import(/* webpackMode: "lazy", webpackChunkName: "player-matches" */ '../../../../components/PlayerTabsContent/views/Matches'),
  peers: () => import(/* webpackMode: "lazy", webpackChunkName: "player-peers" */ '../../../../components/PlayerTabsContent/views/Peers'),
  rankings: () => import(/* webpackMode: "lazy", webpackChunkName: "player-rankings" */ '../../../../components/PlayerTabsContent/views/Rankings'),
  records: () => import(/* webpackMode: "lazy", webpackChunkName: "player-records" */ '../../../../components/PlayerTabsContent/views/Records'),
  totals: () => import(/* webpackMode: "lazy", webpackChunkName: "player-totals" */ '../../../../components/PlayerTabsContent/views/Totals'),
  trends: () => import(/* webpackMode: "lazy", webpackChunkName: "player-trends" */ '../../../../components/PlayerTabsContent/views/Trends'),
  wardmap: () => import(/* webpackMode: "lazy", webpackChunkName: "player-wardmap" */ '../../../../components/PlayerTabsContent/views/Wardmap')
};


export namespace PlayerNavigation {
  export interface Props {
    playerId: string | number;
  }
}

export default class PlayerNavigation extends React.Component<PlayerNavigation.Props> {


  static Link({playerId, routeName, imageFormat}) {
    return (
      <NavLink to={`/player/${playerId}/${routeName}`} activeClassName='active'><img
        src={`../../assets/icons/${routeName}.${imageFormat}`} alt=""/></NavLink>
    )
  }

  static Route({playerId, routeName}) {
    return (
      <Route path={`/player/${playerId}/${routeName}`}
             exact={true}
             component={() => (<AsyncComponent moduleProvider={tabsContent[routeName]}/>)}/>
    )
  }

  render() {
    const playerId = this.props.playerId;


    return (
      <span>
        <div className='tab-list'>
          <PlayerNavigation.Link playerId={playerId} routeName='overview' imageFormat='png'/>
          <PlayerNavigation.Link playerId={playerId} routeName='matches' imageFormat='svg'/>
          <PlayerNavigation.Link playerId={playerId} routeName='heroes' imageFormat='png'/>
          <PlayerNavigation.Link playerId={playerId} routeName='peers' imageFormat='svg'/>
          <PlayerNavigation.Link playerId={playerId} routeName='records' imageFormat='svg'/>
          <PlayerNavigation.Link playerId={playerId} routeName='totals' imageFormat='svg'/>
          <PlayerNavigation.Link playerId={playerId} routeName='histograms' imageFormat='png'/>
          <PlayerNavigation.Link playerId={playerId} routeName='trends' imageFormat='png'/>
          <PlayerNavigation.Link playerId={playerId} routeName='wardmap' imageFormat='svg'/>
          <PlayerNavigation.Link playerId={playerId} routeName='rankings' imageFormat='svg'/>
          <div className="active-watcher"/>
        </div>
        <div className="tab-content">
            <PlayerNavigation.Route playerId={playerId} routeName='overview'/>
            <PlayerNavigation.Route playerId={playerId} routeName='matches'/>
            <PlayerNavigation.Route playerId={playerId} routeName='heroes'/>
            <PlayerNavigation.Route playerId={playerId} routeName='peers'/>
            <PlayerNavigation.Route playerId={playerId} routeName='records'/>
            <PlayerNavigation.Route playerId={playerId} routeName='totals'/>
            <PlayerNavigation.Route playerId={playerId} routeName='histograms'/>
            <PlayerNavigation.Route playerId={playerId} routeName='trends'/>
            <PlayerNavigation.Route playerId={playerId} routeName='wardmap'/>
            <PlayerNavigation.Route playerId={playerId} routeName='rankings'/>
        </div>
      </span>
    )
  }
}
