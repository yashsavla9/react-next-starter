import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS
} from "../actions/types";

// initial state
const initialState = {
  error: null,
  loading: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        user: action.payload,
        loading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case REGISTER_START:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        user: action.payload,
        loading: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
