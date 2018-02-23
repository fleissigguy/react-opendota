import { createAction } from 'redux-actions';
import axios from 'axios';
import * as UserActions from '../constants/user';

const userRequest = createAction<UserStoreState>(UserActions.USER_REQUEST);
const setShortUserRequest = createAction<ShortUserInfo>(UserActions.SET_SHORT_USER);
const setDefaultState = createAction<ShortUserInfo>(UserActions.CLEAR_USER);
// const setDefaultSearchState = createAction(UserActions.SET_DEFAULT_STATE);

export const getFullUser = (userId:number) => async dispatch => {
  dispatch(userRequest({loading: true, completed: false}));
  try {
    const response = await axios.get<UserInfo>(`https://api.opendota.com/api/players/${userId}`);
    dispatch(userRequest({
      loading: false,
      completed: true,
      user: response.data
    }));
  } catch (e) {
    console.error(e);
    dispatch(userRequest({
      loading: false,
      completed: true,
      user: null,
      error: e
    }));
  }
};

export const setUser = (user:ShortUserInfo) => dispatch =>{
  dispatch(setShortUserRequest(user));
};

// export const clearUser => dispatch => {
//
// }
