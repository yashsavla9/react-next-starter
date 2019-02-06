import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import imageReducer from "./imageReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  images: imageReducer
});
