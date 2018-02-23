import { handleActions } from 'redux-actions';
import * as UserActions from '../constants/user';

const cachedShortUser = localStorage.getItem('short_user');
const initialState: UserStoreState = {
  completed: false,
  error:null,
  loading: false,
  shortUser: cachedShortUser && JSON.parse(cachedShortUser) || null,
  user: null
};


export default handleActions<UserStoreState>({
  [UserActions.USER_REQUEST]: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  },
  [UserActions.SET_DEFAULT_STATE]: () => {
    return {...initialState}
  },
  [UserActions.SET_SHORT_USER]: (state, action) => {
    localStorage.setItem('short_user', JSON.stringify(action.payload));
    return {
      ...state,
      shortUser:{...action.payload} as ShortUserInfo
    };
  }
}, initialState);
