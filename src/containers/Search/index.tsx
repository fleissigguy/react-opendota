import * as React from 'react';
import * as SearchActions from '../../actions/search';
import './style.scss';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import PageInformer from "../../utils/PageInformer";
import { history } from '../../index';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import SearchUser from '../../components/SearchUser';


export namespace Search {
  export interface Props extends RouteComponentProps<void> {
    search: SearchStoreState;
    actions: typeof SearchActions;
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Search extends React.Component<Search.Props, Search.State> {
  searchInput: HTMLInputElement;
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    PageInformer.setPageInfo('Поиск', 'Найдутся все :)');
  }

  componentDidMount() {
    const routeParams = queryString.parse(this.context.router.route.location.search);
    if (routeParams.query) {
      this.searchInput.value = routeParams.query;
    }
    if (!routeParams.query) {
      this.props.actions.clearUsers();
    } else if (!this.props.search.results.length) {
      this.props.actions.searchUsers(routeParams.query);
    }
  }

  componentWillUnmount(){
    this.props.actions.clearUsers();
  }

  componentWillReceiveProps(newProps) {
    // if(newProps.search.loading){
    //   this.context.router.
    // }
  }

  @autobind()
  searchUsers(e) {
    e.preventDefault();
    history.push('/search?query=' + this.searchInput.value);
    this.props.actions.searchUsers(this.searchInput.value)
  }

  render() {
    const {search} = this.props;

    return (
      <div className={`page search ${search.loading && 'is-loading'}`}>
        <form noValidate={true} className={`search-user-form ${search.results.length && 'results-is-not-empty'}`}>
          <i className="fab fa-steam"/>
          <input type="text" className="search-input" name='search-input' ref={ref => this.searchInput = ref}/>
          <button className="search-users-button" type='submit' onClick={this.searchUsers}>поиск</button>
        </form>

        {!search.loading &&
        <div className="search-results">{
          search.results.length &&
          search.results.map((result, key) => <SearchUser key={key} data={result}/>) ||
          (search.completed &&
            <div className="not-found">
              <span>Ничего не найдено :(</span>
            </div>)
        }</div>
        }
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
