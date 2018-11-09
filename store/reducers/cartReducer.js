import {
  ADD_CART_BY_ID,
  DECRESE_CART_COUNT,
  INCRESE_CART_COUNT,
  TOGGLE_CART_STATUS,
  TOGGLE_ALL_CART_STATUS,
  TOGGLE_CART_EIDT,
  DELETE_CART_ISCHECKED
} from '../actions/actionType.js';

const initState = {
  cart: wx.getStorageSync('Mycart').cart || [],
};

export default(state = initState, action) => {
  let newState = Object.assign({}, state);
  switch(action.type){
    case ADD_CART_BY_ID:
      const isCart = newState.cart.some(item => {
        return item.id === action.payload.id
      })
      if (isCart) {
        newState.cart = newState.cart.map(item => {
          if (item.id === action.payload.id)
            item.count += 1;
          return item;
        })
      } else {
        action.payload = Object.assign(action.payload, { count: 1, isChecked: false });
        newState.cart = newState.cart.concat(action.payload);
      }
      break;

    case TOGGLE_CART_STATUS:
      newState.cart = newState.cart.map(item => {
        if (item.id === action.payload.id)
          item.isChecked = !item.isChecked;
        return item;
      })
      break;

    case DECRESE_CART_COUNT:
      newState.cart = newState.cart.map(item => {
        if (item.id === action.payload.id)
          item.count = item.count > 1 ? item.count - 1 : 1;
        return item;
      })
      break;

    case INCRESE_CART_COUNT:
      newState.cart = newState.cart.map(item => {
        if (item.id === action.payload.id)
          item.count += 1;
        return item;
      })
      break;
    
    case TOGGLE_ALL_CART_STATUS:
      newState.cart = newState.cart.map(item => {
        item.isChecked = action.payload.isTrue;
        return item;
      })
      break;

    case DELETE_CART_ISCHECKED:
      newState.cart = newState.cart.reduce((result, item) => {
        if (!item.isChecked)
          result.push(item)
        return result
      }, [])
      break;
    default: 
    return newState;
  }
  //console.log(newState)
  wx.setStorageSync('Mycart', newState)
  return newState;
};