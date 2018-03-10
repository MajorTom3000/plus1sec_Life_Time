import React, { Component } from 'react';
import PersonalForm from './PersonalForm';
import {
  AppRegistry,
  Text,
  View,
  Button,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

//code 2 fragment : copy this code, BEGIN 2
const data = require('../data/food.json');

//var jsonobject = {"sn":{"sn":{"sn":"nested key","s3":"hi"},"s2":{"s22":"coucou","sn":"nested key"}},"s1":{"sn":"nested key"}};


//END 2

export default class MealPlan extends Component {
  //code 3 fragment : copy this code, BEGIN 3
  json_function = () => {

  //   var nu = "nutrition";
  //   // var b = "nutrition-per-100ml";
  //   for (i = 0; i < data.length; i++) {
  //   	var a = "nutrition-per-100g";
  //   	var b = "nutrition-per-100ml";
  //     var obj = data[i];
  //     if (obj.hasOwnProperty("nutrition-per-100g")) {
  //
  //         obj.nutrition = obj.a; delete obj.a;
  //     }
  //     else if (obj.hasOwnProperty("nutrition-per-100ml")) {
  //
  //         obj.nutrition = obj.b; delete obj.b;
  //
  //     }
  //
  // }
    var a = "nutrition-per-100g";

    var randomIndex1 = Math.floor(Math.random() * data.length);
    var json_fragment1 = data[randomIndex1].name;
    var j1c = data[randomIndex1][a].energy;
    var randomIndex2 = Math.floor(Math.random() * data.length);
    var json_fragment2 = data[randomIndex2].name;
    var j2c = data[randomIndex2][a].energy;
    var randomIndex3 = Math.floor(Math.random() * data.length);
    var json_fragment3 = data[randomIndex3].name;
    var j3c = data[randomIndex3][a].energy;
    var randomIndex4 = Math.floor(Math.random() * data.length);
    var json_fragment4 = data[randomIndex4].name;
    var j4c = data[randomIndex4][a].energy;
    var randomIndex5 = Math.floor(Math.random() * data.length);
    var json_fragment5 = data[randomIndex5].name;
    var j5c = data[randomIndex5][a].energy;
    var randomIndex6 = Math.floor(Math.random() * data.length);
    var json_fragment6 = data[randomIndex6].name;
    var j6c = data[randomIndex6][a].energy;
    var randomIndex7 = Math.floor(Math.random() * data.length);
    var json_fragment7 = data[randomIndex7].name;
    var j7c = data[randomIndex7][a].energy;
    var randomIndex8 = Math.floor(Math.random() * data.length);
    var json_fragment8 = data[randomIndex8].name;
    var j8c = data[randomIndex8][a].energy;


    alert("Today's meal: " + '\n' + '\n' +
          "Breakfast: " + json_fragment1 + ',' + json_fragment2 + '\n' + "Calories: " + j1c/4 + "+" + j2c/4 + '\n' +  '\n' +
          "Lunch: " + json_fragment3 + ',' + json_fragment4 + ',' + json_fragment5 + '\n' + "Calories: " + j3c/4 + "+" + j4c/4 + "+" + j5c/4 + '\n' + '\n' +
          "Dinner: " + json_fragment6 + ',' + json_fragment7 + ',' + json_fragment8 + '\n' + "Calories: " + j6c/4 + "+" + j7c/4 + "+" + j8c/4 +'\n');
    //var myJson = require("../data/food.json");




}

 //  var obj = "";
 // renameObj(obj)
 // {
 //
 // }

  goback() {
   var _that = this;
   this.props.navigator.push({
       component: PersonalForm
     });
 }
  render() {
    return (
      <View>
      <View style={styles.row}>
          <Text style={styles.btn} onPress={this.json_function.bind(this)}>Go Get it!</Text>
      </View>
      <View style={styles.row}>
          <Text style={styles.btn} onPress={this.goback.bind(this)}>Go Back</Text>
      </View>
      </View>
    );
  }
  //END 3
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

AppRegistry.registerComponent('MealPlan', () => MealPlan);
