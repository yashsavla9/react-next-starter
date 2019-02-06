import Router from "next/router";
import authApi from "../api/auth";
import imageApi from "../api/pixabay";
import promiseWrap from "../helper/promiseWrapper";
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  IMAGE_FETCH_FAIL,
  IMAGE_FETCH_START,
  IMAGE_FETCH_SUCCESS
} from "./types";

// actions
// login a user
export const loginUser = user => async dispatch => {
  let err, response;
  dispatch({ type: LOGIN_START });
  [err, response] = await promiseWrap(authApi.post("/login", user));
  if (err) {
    return dispatch({
      type: LOGIN_FAIL,
      payload: err
    });
  }

  Router.push("/");

  return dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      email: user.email,
      token: response.data.token
    }
  });
};

// register user
export const registerUser = user => async dispatch => {
  let err, response;
  dispatch({ type: REGISTER_START });
  [err, response] = await promiseWrap(authApi.post("/register", user));
  if (err) {
    return dispatch({
      type: REGISTER_FAIL,
      payload: err
    });
  }

  return dispatch({
    type: REGISTER_SUCCESS,
    payload: response.data
  });
};

// fetch images
export const fetchImages = query => async dispatch => {
  let err, response;
  dispatch({ type: IMAGE_FETCH_START });
  [err, response] = await promiseWrap(
    imageApi.get("/", {
      params: {
        page: query.page,
        per_page: query.limit
      }
    })
  );

  if (err) {
    return dispatch({
      type: IMAGE_FETCH_FAIL,
      payload: err
    });
  }

  return dispatch({
    type: IMAGE_FETCH_SUCCESS,
    payload: response.data
  });
};
