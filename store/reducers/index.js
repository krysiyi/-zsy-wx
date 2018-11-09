import { combineReducers } from '../../libs/redux.min.js';
import cart from './cartReducer.js';
import page from './pageReducer.js';

export default combineReducers({
cart,
page
});
