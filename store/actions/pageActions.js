import {
  INPUT_SEARCH,
  DELETE_SEARCH
} from './actionType.js';

const inputSearch = (payload) => {
  return {
    type: INPUT_SEARCH,
    payload
  }
}

const deleteSearch = (payload) => {
  return {
    type: DELETE_SEARCH,
    payload
  }
}

export {
  inputSearch,
  deleteSearch
};