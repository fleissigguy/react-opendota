import { handleActions } from 'redux-actions';
import * as SearchActions from '../constants/search';

const initialState: SearchStoreState = {
  completed: false,
  loading: false,
  results: []
};


export default handleActions<SearchStoreState | any>({
  [SearchActions.SEARCH]: (state, action) => {
    const newState ={
      loading: true,
      completed: false,
      ...state,
      ...action.payload,
    };
    debugger;
    return newState;
  },
  [SearchActions.SEARCH_REQUEST]: (state, action) => {
      return {
        loading:true,
        completed:false,
        ...action.payload
      }
  }
}, initialState);
