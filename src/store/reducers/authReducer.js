import isEmpty from 'lodash/isEmpty';
import {
  RESET_DATA,
  AUTH_TOKEN,
  USER_DATA,
  AUTH_LOADING,
  HOME_SUCCESS,
  HOME_ERROR,
  HOME_LOADING,
  LOGIN_RESET,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
} from '../constants/authConstant';

const iniState = {
  authError: null,
  authErrorCode: null,
  isAuthenticated: false,
  //UserData: [],

  loading: false,
  homeLoader: false,
  isHomeLoaded: false,
  homeError: false,

  homeErrorMsg: null,
  homeErrorToken: null,
  homeErrorUrl: null,
};

const authReducer = (state = iniState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case RESET_DATA:
      return {
        authError: null,
        authErrorCode: null,
        isAuthenticated: false,
        //UserData: [],

        loading: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isAuthenticated: true,
        authError: null,
        authErrorMsg: null,
        loading: false,
      };

    case HOME_ERROR:
      return {
        ...state,
        homeError: true,
        homeLoader: false,
        homeErrorMsg: action.msg.message,
        homeErrorToken: action.token,
        homeErrorUrl: action.url,
        isHomeLoaded: false,
      };

    case HOME_LOADING:
      return {
        ...state,
        homeError: false,
        homeLoader: true,
        isHomeLoaded: false,
      };
    case HOME_SUCCESS:
      return {
        ...state,
        homeData: action.payload,
        homeError: false,
        homeLoader: false,
        isHomeLoaded: true,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        authError: action.err,
        authErrorCode: action.code,
        isAuthenticated: false,
        //authErrorMsg:action.msg,
        loading: false,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        userData: null,
        isAuthenticated: false,
        authError: null,
        authErrorMsg: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
