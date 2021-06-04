import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  RefreshControl,
  TextInput,
  StatusBar,
  Alert,
  FlatList,
  Animated,
  Easing,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {isEmpty, isArray, isObject} from 'lodash';

import {TapGestureHandler, State} from 'react-native-gesture-handler';
import config from './../settings';

import {HomeAction, signOut} from './../store/actions/authActions';

import DataList from './../components/DataList';

const {width, height} = Dimensions.get('window');

const ITEM_SIZE = 250;
const scrollY = new Animated.Value(0);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logOut: false,
    };
  }

  componentDidMount(props) {}

  renderItem = (data, index) => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 3)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
      extrapolate: 'clamp',
    });

    const OpacityInputRange = [
      -1,
      0,
      ITEM_SIZE * index,
      ITEM_SIZE * (index + 1),
    ];
    const opacity = scrollY.interpolate({
      inputRange: OpacityInputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        key={index}
        style={{
          transform: [{scale}],
          opacity,
        }}>
        <DataList
          key={index}
          navigation={this.props.navigation}
          data={data}></DataList>
      </Animated.View>
    );
  };

  onRefresh = () => {
    return console.log('Refreshed');
  };

  render() {
    const {homeLoader} = this.props.authReducerFeed;

    if (this.props.authReducerFeed.userData == null) {
      this.props.navigation.navigate('LogOutScreen');
    }

    return (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#fff',
          justifyContent: 'center',
          marginTop: -40,
          paddingHorizontal: 20,
        }}>
        <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
          hidden={true}
          translucent={false}
        />

        <View
          style={{
            flexDirection: 'row',
            height: 40,
            marginTop: 80,
            marginBottom: 15,
          }}>
          <View
            style={{
              width: '85%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={config.themeDefault.IMAGES.ManiakLogo}
              style={{
                width: 130,
                height: 30,
                marginTop: 10,
                borderWidth: 0,
                borderColor: 'red',
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                fontWeight: '300',
                fontSize: 21,
                marginTop: 2,
                color: '#aaa',
              }}>
              HOME
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#bbb',
              justifyContent: 'center',
              padding: 5,
              borderRadius: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                //alert('Logout');
                this.props.signOut();
              }}>
              <Text style={{fontSize: 10, fontWeight: '600'}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {homeLoader ? (
          <ActivityIndicator />
        ) : (
          <Animated.FlatList
            scrollEventThrottle={16}
            style={{
              marginTop: Platform.OS === 'ios' ? 0 : -15,
              marginBottom: 100,
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {contentOffset: {y: scrollY}},
                },
              ],
              {useNativeDriver: true},
            )}
            data={this.props.authReducerFeed.homeData}
            refreshControl={null}
            renderItem={({item, index}) => {
              return this.renderItem(item, index);
            }}
            keyExtractor={(data, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    HomeAction: credentials => dispatch(HomeAction(credentials)),
    signOut: params => dispatch(signOut(params)),
  };
}

function mapStateToProps(state) {
  return {
    authReducerFeed: state.authReducerFeed,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps, //null,{renderCountProp: 'renderCounter'}
)(Home);
