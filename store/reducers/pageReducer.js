import {
  INPUT_SEARCH,
  DELETE_SEARCH
} from '../actions/actionType.js';

const initState = {
  history: wx.getStorageSync('Mysearch').history || [],
};

export default (state = initState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case INPUT_SEARCH:
      let currentIndex = -1; 
      newState.history = newState.history.filter(item => item !==action.payload)
      // newState.history.map((item,index) => {
      //   if(item===action.payload)
      //     currentIndex = index;
      //   return item; 
      // })
      // if(currentIndex!==-1)
      //   newState.history.splice(currentIndex,1);
      newState.history.unshift(action.payload);
      break;
    case DELETE_SEARCH:
      newState.history.splice(action.payload,1);
    default: 
      return newState;
  }
  wx.setStorageSync('Mysearch', newState)
  return newState;
};