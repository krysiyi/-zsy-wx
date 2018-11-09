import {
  ADD_CART_BY_ID,
  DECRESE_CART_COUNT,
  INCRESE_CART_COUNT,
  TOGGLE_CART_STATUS,
  TOGGLE_ALL_CART_STATUS,
  TOGGLE_CART_EIDT,
  DELETE_CART_ISCHECKED
} from './actionType.js';

const addCartById = (payload) => {
  return {
    type: ADD_CART_BY_ID,
    payload
  }
}

const addCount = (id) => {
  return {
    type: INCRESE_CART_COUNT,
    payload: {
      id
    }
  }
}

const reduceCount = (id) => {
  return {
    type: DECRESE_CART_COUNT,
    payload: {
      id
    }
  }
}
const toggleCartStatus = (id) => {
  return {
    type: TOGGLE_CART_STATUS,
    payload: {
      id
    }
  }
}

const toggleAllCartStatus = (isTrue) => {
  return {
    type: TOGGLE_ALL_CART_STATUS,
    payload: {
      isTrue
    }
  }
}

const deleteCartIschecked = () => {
  return {
    type: DELETE_CART_ISCHECKED
  }
}
export {
  addCartById,
  addCount,
  reduceCount,
  toggleCartStatus,
  toggleAllCartStatus,
  deleteCartIschecked
};