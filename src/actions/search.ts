import { createAction } from 'redux-actions';
import axios from 'axios';
import * as SearchActions from '../constants/search';

const searchUsersRequest = createAction<SearchStoreState>(SearchActions.SEARCH_REQUEST);
const setDefaultSearchState = createAction(SearchActions.SET_DEFAULT_SEARCH_STATE);

export const searchUsers = query => async dispatch => {
  dispatch(searchUsersRequest({loading: true, completed: false}));
  try {
    const response = await axios.get<Array<ShortUserInfo>>(`https://api.opendota.com/api/search?q=${query}`);
    dispatch(searchUsersRequest({
      loading: false,
      completed: true,
      results: [...response.data]
    }));
  } catch (e) {
    console.error(e);
    dispatch(searchUsersRequest({
      loading: false,
      completed: true,
      results: [],
      error: e
    }));
  }
};

export const clearUsers = () => dispatch => {
  dispatch(setDefaultSearchState());
};
