import { applyMiddleware, compose, combineReducers, createStore } from "redux";
// import ProfileReducer from "../reducer/profile-reduser.js";
import AuthReducer from "../reduser/auth-reduser.js";
import AppReducer from "../reduser/app-reduser.js";
import DataReduser from "../reduser/data-reduser.js";
import thunkMiddleware from "redux-thunk";


let redusers = combineReducers({
  //   ProfilePage: ProfileReducer,
  auth: AuthReducer,
  app: AppReducer,
  data: DataReduser,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  redusers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// store.dispatch(refreshAndAuthenticate());

//Добавил и установил applyMiddleware(thunkMiddleware), для работы thunk
// let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;
