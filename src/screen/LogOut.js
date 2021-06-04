//import "react-native-gesture-handler";
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  StatusBar,
  Alert,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {isEmpty, isArray, isObject} from 'lodash';

import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import config from './../settings';
import {
  LoginAction,
  ResetAction,
  HomeAction,
} from './../store/actions/authActions';

const {width, height} = Dimensions.get('window');

class LogOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: config.themeDefault.OTHERS.username,
      pass: config.themeDefault.OTHERS.password,
      loggedIn: false,
      userInfo: null,
    };
  }

  componentDidMount(props) {
    if (this.props.authReducerFeed.isAuthenticated) {
      if (!this.props.authReducerFeed.isHomeLoaded) {
        this.props.HomeAction(this.props.authReducerFeed.userData.token);
      }

      this.props.navigation.navigate('HomeScreen');
    } else {
      this.props.ResetAction();
    }
  }

  render() {
    const {loading, isAuthenticated, userData, isHomeLoaded} =
      this.props.authReducerFeed;
    const {loggedIn} = this.state;

    if (isAuthenticated && loggedIn === false) {
      this.setState({loggedIn: true});

      if (!isHomeLoaded) {
        this.props.HomeAction(userData.token);
      }
      this.props.navigation.navigate('HomeScreen');
    }

    return isAuthenticated ? (
      <ActivityIndicator />
    ) : (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#fff',
          justifyContent: 'flex-end',
        }}>
        <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
          hidden={true}
          translucent={false}
        />

        <View
          style={{
            height: height / 1.5,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={config.themeDefault.IMAGES.ManiakLogo}
            style={{
              width: 170,
              height: 40,
              marginTop: 140,
              borderWidth: 0,
              borderColor: 'red',
            }}
          />

          <Text
            style={{
              fontWeight: '600',
              fontSize: 20,
              marginTop: 80,
              color: '#aaa',
            }}>
            WELCOME
          </Text>
        </View>

        <View
          style={{
            height: height / 3,
            marginTop: 5,
            backgroundColor: '#bbb',

            top: null,
            justifyContent: 'center',
          }}>
          <View style={[styles.button, {marginTop: 140}]}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('LoginScreen');
                }}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  Get Started
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    HomeAction: credentials => dispatch(HomeAction(credentials)),
    ResetAction: credentials => dispatch(ResetAction(credentials)),
  };
}

function mapStateToProps(state) {
  return {
    authReducerFeed: state.authReducerFeed,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 40,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 50,
    paddingLeft: 20,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
  },
  closeButton: {
    height: 45,
    width: 45,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -60,
    left: width / 2 - 20,
    shadowColor: '#0000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.95,
    shadowRadius: 3.84,

    elevation: 5,
  },

  Logo: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',

    left: width / 2 - 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
