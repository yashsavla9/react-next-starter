import {
  IMAGE_FETCH_FAIL,
  IMAGE_FETCH_START,
  IMAGE_FETCH_SUCCESS
} from "../actions/types";

// initial state
const initialState = {
  error: null,
  loading: false,
  images: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_FETCH_START:
      return {
        ...state,
        loading: true
      };
    case IMAGE_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        images: [...state.images, ...action.payload]
      };
    case IMAGE_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
