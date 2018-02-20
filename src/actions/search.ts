import { createAction } from 'redux-actions';
import axios from 'axios';
import * as SearchActions from '../constants/search';

// export const searchUsers = createAction<SearchStoreState>(SearchActions.SEARCH,
//   (query:string)=>{
//     axios.get('https://api.opendota.com/api/search')
//   });
const searchUsersRequest = createAction<SearchStoreState>(SearchActions.SEARCH);

const action = (type, data:SearchStoreState = {}) =>
  ({
    type: type,
    payload: {...data}
  });


export const searchUsers = (query) => {
  console.log('query',query);
  searchUsersRequest({loading:true});
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
}
