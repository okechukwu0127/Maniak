import {Alert} from 'react-native';

import {
  RESET_DATA,
  AUTH_TOKEN,
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  HOME_LOADING,
  HOME_SUCCESS,
  HOME_ERROR,
} from '../constants/authConstant';
import {isObject} from 'lodash';

import axios from 'axios';
import config from '../../settings';

export const setUserData = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const setHomeData = data => {
  return {
    type: HOME_SUCCESS,
    payload: data,
  };
};

export const LoginAction = (credentials, props) => {
  return async (dispatch, getState) => {
    // alert('hahahah')

    dispatch({type: AUTH_LOADING, loading: true});

    let email = credentials.email;
    let password = credentials.pass;

    try {
      await axios
        .post(config.themeDefault.URL.Base + config.themeDefault.URL.Login, {
          username: email,
          password: password,
        })
        .then(function (response) {
          dispatch(setUserData(response.data));
        })
        .catch(function (error) {
          dispatch({type: LOGIN_ERROR});

          Alert.alert(
            'Login Error',
            'Invalid  ' +
              config.themeDefault.OTHERS.AppName +
              ' Login Details Specified' +
              '\n\nKindly confirm your internet connection',
            [{text: 'OK', onPress: () => null}],
            {cancelable: false},
          );
        });
    } catch (error) {
      Alert.alert(
        'Login Error',
        'Unable to connect to the ' +
          config.themeDefault.OTHERS.AppName +
          ' server\nKindly confirm your internet connection',
        [{text: 'OK', onPress: () => null}],
        {cancelable: false},
      );

      dispatch({type: LOGIN_ERROR});
    }
  };
};

export const ResetAction = (token, props) => {
  return async (dispatch, getState) => {
    dispatch({type: RESET_DATA});
  };
};

export const DispatchRemoveCurrentUser = () => {
  return dispatch => {
    try {
      dispatch({type: LOGOUT_SUCCESS});
    } catch (e) {}
  };
};

export const HomeAction = (token, props) => {
  return async (dispatch, getState) => {
    dispatch({type: HOME_LOADING, loading: true});

    try {
      await axios
        .get(config.themeDefault.URL.Base + config.themeDefault.URL.Images, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        .then(res => {
          dispatch(setHomeData(res.data));
        })

        .catch(function (error) {
          dispatch({
            type: HOME_ERROR,
            msg: error,
            token: token,
            url: config.themeDefault.URL.Base + config.themeDefault.URL.Images,
          });

          Alert.alert(
            'Data Load Error :: 1',
            JSON.stringify(error) +
              '\nUnable to connect to the ' +
              config.themeDefault.OTHERS.AppName +
              ' server\nKindly confirm your internet connection',
            [{text: 'OK', onPress: () => null}],
            {cancelable: false},
          );
        });
    } catch (error) {
      /* Alert.alert(
        'Data Load Error :: 2',
        'Unable to connect to the ' +
          config.themeDefault.OTHERS.AppName +
          ' server\nKindly confirm your internet connection',
        [
          
          {text: 'OK', onPress: () => null},
        ],
        {cancelable: false},
      ); */

      dispatch({
        type: HOME_ERROR,
        msg: error,
        token: token,
        url: config.themeDefault.URL.Base + config.themeDefault.URL.Images,
      });
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState) => {
    dispatch(DispatchRemoveCurrentUser());
  };
};
