import React from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

/* export default function DataList({id, title, description, image}) {
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
} */

function DataList(props) {
  const {id, title, description, image} = props.data;
  return (
    <View
      style={{
        width: 100 + '%',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#eee',
        //height: 170,
        borderRadius: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 4,
        },
       // shadowOpacity: 0.15,
        //shadowRadius: 2.24,
      }}>
      <View style={{justifyContent: 'flex-start'}}>
        <Image
          source={{url: image}}
          style={{
            width: 100 + '%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: 170,
            // marginTop:-10,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            marginTop: 132,
            fontSize: 15,
            fontWeight: '800',
            padding: 10,
            width: 100 + '%',
            color: '#fff',
            backgroundColor: '#303846ab',
          }}>
          {title.toUpperCase()}
        </Text>
      </View>

      <View style={{justifyContent: 'flex-end', paddingHorizontal: 20}}>
        <Text style={{paddingTop: 10, paddingBottom: 10, color: '#524e4e'}}>
          {description}
        </Text>
      </View>
    </View>
  );
}

export default DataList;
