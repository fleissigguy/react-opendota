import { createAction } from 'redux-actions';
import axios from 'axios';
import * as PlayerActions from '../constants/player';
import { getCache, hasCache, setCache } from '../utils/cache';

const playerRequest = createAction<PlayerStoreState>(PlayerActions.PLAYER_REQUEST);


enum CACHES {
  FULL_USER = 'full_user',
  WL_DATA = 'wl_data'
}

export const getFullPlayer = (playerId: number) => async dispatch => {
  dispatch(playerRequest({loading: true, completed: false}));
  const cachedFullUser = getCache(CACHES.FULL_USER) as PlayerInfo;
  if (cachedFullUser && cachedFullUser.profile && cachedFullUser.profile.account_id === playerId) {
    dispatch(playerRequest({
      loading: false,
      completed: true,
      fullPlayer: cachedFullUser,
      wl: getCache(CACHES.WL_DATA)
    }));
  } else {
    try {
      const fullUserResponse = await axios.get<PlayerInfo>(`https://api.opendota.com/api/players/${playerId}`);
      const wlResponse = await axios.get<WLInfo>(`https://api.opendota.com/api/players/${playerId}/wl`);
      const obj:any = {
        loading: false,
        completed: true,
        fullPlayer: setCache(CACHES.FULL_USER, fullUserResponse.data),
        wl: setCache(CACHES.WL_DATA, wlResponse.data)
      };
      dispatch(playerRequest(obj));
    } catch (e) {
      console.error(e);
      dispatch(playerRequest({
        loading: false,
        completed: true,
        fullPlayer: null,
        wl: null,
        error: e
      }));
    }
  }
};


// export const clearPlayer => dispatch => {
//
// }
