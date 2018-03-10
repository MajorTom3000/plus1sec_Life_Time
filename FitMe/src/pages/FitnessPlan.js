import React, { Component } from 'react';
import PersonalForm from './PersonalForm';
import {
  AppRegistry,
  Text,
  View,
  Button,
  FlatList,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

const newData = require('../data/exercises.json');


export default class FitnessPlan extends Component {

  json_function = () => {
    var randomIndex1 = Math.floor(Math.random() * newData.length);
    var json_fragment1 = newData[randomIndex1].name;
    var s1 = newData[randomIndex1].steps;
    var p1 = newData[randomIndex1].primary;
    var randomIndex2 = Math.floor(Math.random() * newData.length);
    var json_fragment2 = newData[randomIndex2].name;
    var s2 = newData[randomIndex2].steps;
    var p2 = newData[randomIndex2].primary;
    var randomIndex3 = Math.floor(Math.random() * newData.length);
    var json_fragment3 = newData[randomIndex3].name;
    var s3 = newData[randomIndex3].steps;
    var p3 = newData[randomIndex3].primary;
    // var randomIndex4 = Math.floor(Math.random() * newData.length);
    // var json_fragment4 = newData[randomIndex4].name;
    // var randomIndex5 = Math.floor(Math.random() * newData.length);
    // var json_fragment5 = newData[randomIndex5].name;
    // alert( json_fragment1 + '\n'+
    //        json_fragment3);
    alert("Today's FitnessPlan: " + '\n' + '\n' +
          "Plan 1. " + json_fragment1 + '\n' + '\n' + "Primary:"+ p1 + '\n' + '\n' +"Steps:" + '\n' + s1 + '\n' + '\n' +
          "Plan 2. " + json_fragment2 + '\n' + '\n' + "Primary:"+ p2 + '\n' + '\n' +"Steps:" + '\n' + s2 + '\n' + '\n' +
          "Plan 3. " + json_fragment3 + '\n' + '\n' + "Primary:"+ p3 + '\n' + '\n' +"Steps:" + '\n' + s3 + '\n' );
  }

  goback() {
   var _that = this;
   this.props.navigator.push({
       component: PersonalForm
     });
 }

  render() {
    return(
      <View>
      <View style={styles.row}>
          <Text style={styles.btn} onPress={this.json_function.bind(this)}>Go FitMe!</Text>
      </View>
      <View style={styles.row}>
          <Text style={styles.btn} onPress={this.goback.bind(this)}>Go Back</Text>
      </View>
      </View>
  );
    // return (
    //   <ListView
    //     style={styles.container}
    //     dataSource={this.state.dataSource}
    //     renderRow={(newData) => <View><Text>{newData.name}: {newData.primary}</Text></View>}
    //   />,
    //
    //   <TouchableOpacity onPress={this.goback.bind(this)}>
    //    <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Go Back </Text>
    //   </TouchableOpacity>
    //
    // );
  }
}

const styles = StyleSheet.create({
  flex:{
    flex: 1,
  },
  topStatus:{
    marginTop:25,
  },
  row:{
    flexDirection:'row',
    height:45,
    marginBottom:10
  },
  head:{
    width:70,
    marginLeft:5,
    backgroundColor:'#23BEFF',
    height:45,
    justifyContent:'center',
    alignItems: 'center'
  },
  label:{
    color:'#fff',
    fontSize:15,
    fontWeight:'bold'
  },
  input:{
    height:45,
    borderWidth:1,
    marginRight: 5,
    paddingLeft: 10,
    borderColor: '#ccc'
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
AppRegistry.registerComponent('FitnessPlan', () => FitnessPlan);
