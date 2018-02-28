import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {HashRouter, Link} from 'react-router-dom';
import {ModalContainer, ModalRoute} from 'react-router-modal';
import {createBrowserHistory} from 'history';
import {configureStore} from './store';
import {AsyncComponent} from './utils/AsyncComponentLoader';
import {Header} from './components/Header/index';
import './style.scss';

require('moment/locale/ru');
import RootEventListener from './utils/RootEventListener';

const store = configureStore();
export const history = createBrowserHistory();

const app = () => import(/* webpackMode: "lazy", webpackChunkName: "root" */ './containers/App');
const playground = () => import(/* webpackMode: "lazy", webpackChunkName: "playground" */ './containers/Playground');
const settings = () => import(/* webpackMode: "lazy", webpackChunkName: "settings" */ './containers/Settings');
const search = () => import(/* webpackMode: "lazy", webpackChunkName: "search" */ './containers/Search');
const player = () => import(/* webpackMode: "lazy", webpackChunkName: "player" */ './containers/Player');




const root = ((root: any) => {
  root.addEventListener('scroll', RootEventListener.OnScroll);

  return root;
})(document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div className='page-content'>
        <ModalContainer history={history}/>
        <div className='page-background'/>
        <h2 className='page-description'/>
        <Header/>
        <Switch>
          <Route path="/" exact={true} component={() => <AsyncComponent
            moduleProvider={app}/>}/>
          <Route path="/settings" component={() => <AsyncComponent
            moduleProvider={settings}/>}>
          </Route>
          <Route path="/game" component={() => <AsyncComponent
            moduleProvider={playground}/>}>
          </Route>
          <Route path="/search" component={() => <AsyncComponent
            moduleProvider={search}/>}>
          </Route>
          <ModalRoute className='player-modal' path="/player/:playerId" component={() => (<AsyncComponent moduleProvider={player}/>)}>
          </ModalRoute>
        </Switch>
      </div>
    </HashRouter>
  </Provider>
  ,
  root
);
setTimeout(() => {
  document.querySelector('.lw').remove();
}, 2500);
