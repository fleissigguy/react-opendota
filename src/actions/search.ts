import { createAction } from 'redux-actions';
import axios from 'axios';
import * as SearchActions from '../constants/search';

const searchPlayersRequest = createAction<SearchStoreState>(SearchActions.SEARCH_REQUEST);
const setDefaultSearchState = createAction(SearchActions.SET_DEFAULT_SEARCH_STATE);

export const searchPlayers = query => async dispatch => {
  dispatch(searchPlayersRequest({loading: true, completed: false}));
  try {
    const response = await axios.get<Array<ShortPlayerInfo>>(`https://api.opendota.com/api/search?q=${query}`);
    dispatch(searchPlayersRequest({
      loading: false,
      completed: true,
      results: [...response.data]
    }));
  } catch (e) {
    console.error(e);
    dispatch(searchPlayersRequest({
      loading: false,
      completed: true,
      results: [],
      error: e
    }));
  }
};

export const clearPlayers = () => dispatch => {
  dispatch(setDefaultSearchState());
};
