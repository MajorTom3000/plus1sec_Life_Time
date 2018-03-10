'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity, 
  AppRegistry,
  Navigator,
  Image,
} from 'react-native';

import SearchResults from './SearchResults';
//import PersonalForm from './PersonalForm';
var PersonalForm = require('./PersonalForm');
//import PlayerView from 'player-view';



function urlForQueryAndPage(key, value) {
  const data = {
 
    key:'51f0c784f0022740623c3b29b00d9519'
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://food2fork.com/api/search?' + querystring;
}

export default class SearchPage extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: '',
    };
  }
 
  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  };
  _executeQuery = (query) => {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        }));
  };
  _onSearchPressed = () => {
    const query = urlForQueryAndPage('q', this.state.searchString);
    this._executeQuery(query);
  };
  _handleResponse = (response) => {
    this.setState({ isLoading: false, message: '' })
    if (response.count > 1) {
    this.props.navigation.navigate(
        'Results', { recipes: response.recipes});
    } else {
      this.setState({ message: 'Input not recognized; please try again.'});
    };
  }
  
  render() {
    const spinner = this.state.isLoading ?
    <ActivityIndicator size ='large' /> : null;
    
    return (
      
      <View style={styles.container}>
        <Text style={styles.label}>
          Search for recipes!
        </Text>
        <Text style={styles.description}>
          Search by food name or style.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged.bind(this)}
            placeholder='Search via food name or style' />
          <View style={styles.separator}/>
          <Button
            onPress={this._onSearchPressed.bind(this)}
            color='#F9564F'
            title='Go'
          />
        </View>
        <Image source={require('../Resources/feed.png')} style={styles.image} />
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>


      
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 260,
    height: 260,
  },
  row:{
    flexDirection:'row',
    height:45,
    marginBottom:10
  },
  btn:{
    flex:1,
    backgroundColor:'#FF7200',
    height:45,
    textAlign:'center',
    color:'#fff',
    marginLeft:5,
    marginRight:5,
    lineHeight:45,
    fontSize:15,
  },
});

AppRegistry.registerComponent('SearchPage', () => SearchPage);