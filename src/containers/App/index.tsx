import * as React from 'react';
import * as SearchActions from '../../actions/search';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import PageInformer from "../../utils/PageInformer";
import { autobind } from 'core-decorators';
import {history} from '../../index';
import PropTypes from 'prop-types';
import SearchUser from '../../components/SearchUser';


export namespace App {
  export interface Props extends RouteComponentProps<void> {
    search: SearchStoreState;
    actions: typeof SearchActions;
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {
  searchInput: HTMLInputElement;
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    PageInformer.setPageInfo('Главная', '');
  }

  componentWillReceiveProps(newProps) {
  }

  @autobind()
  searchUsers(e) {
    e.preventDefault();
    if(this.searchInput.value){
      history.push('/search?query='+this.searchInput.value);
    }
  }

  render() {
    const {search} = this.props;

    return (
      <div className={`page app ${search.loading && 'is-loading'}`}>
        <form noValidate={true} className={`search-user-form ${search.results.length && 'results-is-not-empty'}`}>
          <i className="fab fa-steam"/>
          <input type="text" className="search-input" name='search-input' ref={ref => this.searchInput = ref}/>
          <button className="search-users-button" type='submit' onClick={this.searchUsers}>поиск</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SearchActions as any, dispatch)
  };
}
