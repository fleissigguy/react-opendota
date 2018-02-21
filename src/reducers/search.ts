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
      ...state,
      loading: true
    };
  },
  [SearchActions.SEARCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading:false,
      completed:true,
      ...action.payload
    }
  },
  [SearchActions.SEARCH_FAILURE]: (state, action) => {
    return {
      ...state,
      loading:false,
      completed:true,
      ...action.payload
    }
  },
  [SearchActions.SET_DEFAULT_STATE]: (state, action) => {
    return {...initialState}
  }
}, initialState);
