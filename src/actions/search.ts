import { createAction } from 'redux-actions';
import axios from 'axios';
import * as SearchActions from '../constants/search';

// export const searchUsers = createAction<SearchStoreState>(SearchActions.SEARCH,
//   (query:string)=>{
//     axios.get('https://api.opendota.com/api/search')
//   });
const searchUsersRequest = createAction(SearchActions.SEARCH_REQUEST);
const searchUsersSuccess = createAction<SearchStoreState>(SearchActions.SEARCH_SUCCESS);
const searchUsersFailure = createAction<SearchStoreState>(SearchActions.SEARCH_FAILURE);
const setDefaultSearchState = createAction(SearchActions.SET_DEFAULT_STATE);

const action = (type, data: SearchStoreState = {}) =>
  ({
    type: type,
    payload: {...data}
  });


export const searchUsers = query => async dispatch => {
  dispatch(searchUsersRequest());
  try {
    const response = await axios.get<Array<SearchResult>>('https://api.opendota.com/api/search?q=' + query);
    dispatch(searchUsersSuccess({
      results: [...response.data]
    }));
  } catch (e) {
    console.error(e);
    dispatch(searchUsersFailure({error: e}))
  }
};

export const clearUsers = () => dispatch =>{
  dispatch(setDefaultSearchState());
};


// export const searchUsers = (query) => {
//   console.log('query',query);
//   searchUsersRequest({loading:true});
// const response = axios.get<Array<SearchResult>>('https://api.opendota.com/api/search?q=' + query);

// if (response.status) {
//
//   return dispatch(action(SearchActions.SEARCH,{
//     loading:false,
//     completed:true,
//     results:response.data
//   }))
// }

/*

.then(response=>{
  searchUsersRequest({
    loading: false,
    completed: true,
    results: response.data
  });
}).catch(()=>{
  return searchUsersRequest({
    loading: false,
    completed: true,
    results: []
  });
});

return {
  type:SearchActions.SEARCH
};
}
 */
// }
