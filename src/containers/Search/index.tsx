import * as React from 'react';
import * as SearchActions from '../../actions/search';
import * as PlayerActions from '../../actions/player';
import './style.scss';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import PageInformer from "../../utils/PageInformer";
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import SearchPlayer from '../../components/SearchPlayer';


export namespace Search {
  export interface Props extends RouteComponentProps<void> {
    search: SearchStoreState;
    searchActions: typeof SearchActions;
    playerActions: typeof PlayerActions
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Search extends React.Component<Search.Props> {
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
      this.props.searchActions.clearPlayers();
    } else if (!this.props.search.results.length) {
      this.props.searchActions.searchPlayers(routeParams.query);
    }
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(newProps) {
    // if(newProps.search.loading){
    //   this.context.router.
    // }
  }

  @autobind()
  searchPlayers(e) {
    e.preventDefault();
    this.context.router.history.push('/search?query=' + this.searchInput.value);
    this.props.searchActions.searchPlayers(this.searchInput.value)
  }

  @autobind()
  setActivePlayer(player: ShortPlayerInfo){
    this.context.router.history.push(`/player/${player.account_id}`);
  }

  render() {
    const {search} = this.props;

    return (
      <div className={`page search ${search.loading && 'is-loading'}`}>
        <form noValidate={true} className={`search-player-form ${search.results.length && 'results-is-not-empty'}`}>
          <i className="fab fa-steam"/>
          <input type="text" placeholder='ник или id игрока' className="search-input" name='search-input' ref={ref => this.searchInput = ref}/>
          <button className="search-players-button" type='submit' onClick={this.searchPlayers}>поиск</button>
        </form>

        {!search.loading &&
        <div className="search-results">{
          search.results.length &&
          search.results.map((result, key) => <SearchPlayer key={key} handleClick={this.setActivePlayer} data={result}/>) ||
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
    searchActions: bindActionCreators(SearchActions as any, dispatch),
    playerActions: bindActionCreators(PlayerActions as any, dispatch)
  };
}
