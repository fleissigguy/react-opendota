import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import {HashRouter} from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { AsyncComponent } from './utils/AsyncComponentLoader';
import { Header } from './components/Header/index';
import './style.scss';

require('moment/locale/ru');
import RootEventListener from './utils/RootEventListener';

const store = configureStore();
export const history = createBrowserHistory();

const app = () => import(/* webpackMode: "lazy", webpackChunkName: "page.root" */ './containers/App');
const playground = () => import(/* webpackMode: "lazy", webpackChunkName: "page.playground" */ './containers/Playground');
const settings = () => import(/* webpackMode: "lazy", webpackChunkName: "page.settings" */ './containers/Settings');
const search = () => import(/* webpackMode: "lazy", webpackChunkName: "page.search" */ './containers/Search');
const user = () => import(/* webpackMode: "lazy", webpackChunkName: "page.user" */ './containers/User');

const root = ((root: any) => {
  root.addEventListener('scroll', RootEventListener.OnScroll);

  return root;
})(document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div className='page-content'>
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
        </Switch>
        <ModalRoute className='user-modal' path="/user/:userId" parentPath='/search?query=Mankubus'
                    component={() => <AsyncComponent
                      moduleProvider={user}/>}/>
        <ModalContainer history={history}/>
      </div>
    </HashRouter>
  </Provider>
,
root
);
setTimeout(() => {
  document.querySelector('.lw').remove();
}, 2500);
