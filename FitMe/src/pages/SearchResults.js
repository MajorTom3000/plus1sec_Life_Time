'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  AppRegistry,
  Text,
  WebView,
  Linking,
  Navigator,
  Button
} from 'react-native';

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    //const price = item.social_rank.split(' ')[0];
    //const t = item.social_rank;
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri:item.image_url}} />
            <View style={styles.textContainer}>
              <Text style={styles.title}
                numberOfLines={1}>{item.title}</Text>
            </View>
            <View style={styles.MainContainer}>
            <Button title='Click Here To View Details' onPress={ ()=> Linking.openURL(item.f2f_url)} />
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class SearchResults extends Component {
  static navigationOptions = {
    title: 'Results',
  };

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (index) => {
    console.log("Pressed row: "+index);
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={params.recipes}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#F3C677'
  },
  title: {
    fontSize: 15,
    margin: 5,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  MainContainer :{
      flex:1,
      width: 5,
      height: 5,
      marginLeft:10, 
      justifyContent: 'center',
      alignItems: 'center',
  }
});
