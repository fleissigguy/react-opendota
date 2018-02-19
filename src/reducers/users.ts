import { handleActions } from 'redux-actions';
import { UserData } from '../declarations/users';
import { Users } from '../enums/Users';



const initialState: UserData = {
  username: null
};

export default handleActions<UserData, UserData>({
  [Users.NEW_USER]: (state, action): UserData => {
    return {
      ...action.payload,
    };
  }
}, initialState);
