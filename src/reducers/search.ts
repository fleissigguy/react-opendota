import { handleActions } from 'redux-actions';
import * as SearchActions from '../constants/search';

const initialState: SearchStoreState = {
  completed: false,
  error:null,
  loading: false,
  results: []
};


export default handleActions<SearchStoreState>({
  [SearchActions.SEARCH_REQUEST]: (state, action) => {
    return {
      ...state,
      // error: action.payload.error || null,
      ...action.payload
    };
  },
  [SearchActions.SET_DEFAULT_SEARCH_STATE]: () => {
    return {...initialState}
  }
}, initialState);

