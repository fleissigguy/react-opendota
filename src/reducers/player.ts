import { handleActions } from 'redux-actions';
import * as PlayerActions from '../constants/player';

const initialState: PlayerStoreState = {
  completed: false,
  error:null,
  loading: false,
  fullPlayer: null,
  wl: null
};

export default handleActions<PlayerStoreState>({
  [PlayerActions.PLAYER_REQUEST]: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  },
  [PlayerActions.SET_DEFAULT_STATE]: () => {
    return {...initialState}
  }
}, initialState);
