import { handleActions } from 'redux-actions';
import * as SearchActions from '../constants/search';

const initialState: SearchStoreState = {
  completed: false,
  error:null,
  loading: false,
  results: []
};


export default handleActions<SearchStoreState>({
  [SearchActions.SEARCH_REQUEST]: (state) => {
    return {
      loading: true,
      ...state
    };
  },
  [SearchActions.SEARCH_SUCCESS]: (state, action) => {
    return {
      loading:false,
      completed:true,
      ...state,
      ...action.payload
    }
  },
  [SearchActions.SEARCH_FAILURE]: (state, action) => {
    return {
      loading:false,
      completed:true,
      ...state,
      ...action.payload
    }
  }
}, initialState);
