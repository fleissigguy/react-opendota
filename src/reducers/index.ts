import { combineReducers, Reducer } from 'redux';
import search from './search';
import player from './player';


export default combineReducers({
  search,
  player
});
