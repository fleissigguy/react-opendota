import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import {configureStore} from './store';
import {AsyncComponent} from './utils/AsyncComponentLoader';
import {Header} from './components/Header/index';
import './style.scss';
import RootEventListener from './utils/RootEventListener';

const store = configureStore();
const history = createBrowserHistory();

const app = () => import(/* webpackMode: "lazy", webpackChunkName: "app-root" */ './containers/App');
const playground = () => import(/* webpackMode: "lazy", webpackChunkName: "app-playground" */ './containers/Playground');
const settings = () => import(/* webpackMode: "lazy", webpackChunkName: "app-settings" */ './containers/Settings');

const root = ((root: any) => {
  root.addEventListener('scroll', RootEventListener.OnScroll);

  return root;
})(document.getElementById('root'));

setTimeout(() => {

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <div>
          <div className='page-background'/>
          <h2 className='page-description'>ORU</h2>
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
          </Switch>
        </div>
      </Router>
    </Provider>,
    root
  );
  setTimeout(() => {
    document.querySelector('.lw').remove();
  }, 2500);
}, 1000);
