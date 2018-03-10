'use strict';
import React, { Component } from 'react';
import Account from './Account';
import MealPlan from './MealPlan';
import FitnessPlan from './FitnessPlan';
import SearchPage from './SearchPage';
import App from './App'
//import YelpApi from './YelpApi';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  ToolbarAndroid,
  Navigator,
  ActivityIndicator
} from 'react-native';

//用户信息填写组件
export default class PersonalForm extends Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {gender: '', age: '', height: '', weight: '', favoritefood: ''};
  }

  //页面的组件渲染完毕（render）之后执行
  componentDidMount(){
    var _that = this;

    //需要查询的键值
    var keys = ["gender","age","height","weight","favoritefood"];
    //根据键数组查询保存的键值对
    AsyncStorage.multiGet(keys, function(errs, result){
      //如果发生错误，这里直接返回（return）防止进入下面的逻辑
      if(errs){
        return;
      }

      //得到的结果是二维数组（result[i][0]表示我们存储的键，result[i][1]表示我们存储的值）
      _that.setState({
        gender: (result[0][1]!=null)?result[0][1]:'',
        age: (result[1][1]!=null)?result[1][1]:'',
        height: (result[2][1]!=null)?result[2][1]:'',
        weight: (result[3][1]!=null)?result[3][1]:'',
        favoritefood: (result[4][1]!=null)?result[4][1]:''
      });
    });
  }

  //组件渲染
  render() {
    return (
      
      <View style={styles.flex}>
          <View style={styles.row}>
            <View style={styles.head}>
              <Text style={styles.label}>Gender</Text>
            </View>
            <View style={styles.flex}>
              <TextInput style={styles.input}
                value={this.state.gender}
                onChangeText={(gender) => this.setState({gender})}/>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.head}>
              <Text style={styles.label}>Age</Text>
            </View>
            <View style={styles.flex}>
              <TextInput style={styles.input}
                value={this.state.age}
                onChangeText={(age) => this.setState({age})}/>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.head}>
              <Text style={styles.label}>Height(M)</Text>
            </View>
            <View style={styles.flex}>
              <TextInput style={styles.input}
                value={this.state.height}
                onChangeText={(height) => this.setState({height})}/>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.head}>
              <Text style={styles.label}>Weight(KG)</Text>
            </View>
            <View style={styles.flex}>
              <TextInput style={styles.input}
                value={this.state.weight}
                onChangeText={(weight) => this.setState({weight})}/>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.head}>
              <Text style={styles.label}>Favorite Food</Text>
            </View>
            <View style={styles.flex}>
              <TextInput style={styles.input}
                value={this.state.favoritefood}
                onChangeText={(favoritefood) => this.setState({favoritefood})}/>
            </View>
          </View>

          <View style={styles.row}>
              <Text style={styles.btn} onPress={this.save.bind(this)}>Save</Text>
              <Text style={styles.btn} onPress={this.clear.bind(this)}>Clear</Text>
          </View>

          <View style={styles.row}>
              <Text style={styles.btn} onPress={this.bmi.bind(this)}>BMI（Body Mass Index)</Text>
          </View>

          <View style={styles.row}>
              <Text style={styles.btn} onPress={this.meal.bind(this)}>MealPlan</Text>
              <Text style={styles.btn} onPress={this.fitness.bind(this)}>FitnessPlan</Text>
          </View>

          <View style={styles.row}>
              <Text style={styles.btn} onPress={this.search.bind(this)}>Search</Text>
          </View>
      
      </View>
    );
  }

  //保存数据
  save() {
    //设置多项
    var _that = this;
    var keyValuePairs = [['gender', this.state.gender], ['age', this.state.age], ['height', this.state.height], ['weight', this.state.weight], ['favoritefood', this.state.favoritefood]]
    AsyncStorage.multiSet(keyValuePairs, function(errs){

      if(errs){
        //TODO：存储出错
        return;
      }
      alert('Successfully Saved');

    });
  }

  //清除数据
  clear() {
    var _that = this;
    AsyncStorage.clear(function(err){
      if(!err){
        _that.setState({
          gender: "",
          age: "",
          height: "",
          weight: "",
          favoritefood: ""
        });
        alert('Clear Done!');
      }
    });
  }

  bmi(){

      AsyncStorage.getItem('height',(error,resultA) => {
            if (error) {
                alert("Please try again");
            }else{
               //console.log(resultA);
                AsyncStorage.getItem('weight',(error,resultB) => {
            if (error) {
                alert("Pleas try again");
            }else{
                //console.log(resultB);
                var finalResult = Number(resultB / (resultA * resultA ));
                var finalResult = Math.round(finalResult * 100) / 100;
                //console.log(finalResult);
                var finalValue = "";
                var suggestion = "";
                if (finalResult >= 30) { finalValue = "Obese"; suggestion = "You need meal plan to keep health."}
                else if (finalResult >= 25 && finalResult <= 29.9) { finalValue = "Overweight"; suggestion = "You need some fitness plan to lose weight."  }
                else if (finalResult >= 18.5 && finalResult <= 24.9) { finalValue = "Normal"; suggestion = "Our fitness plan help you to keep fit."}
                else if (finalResult < 18.5) { finalValue = "Underweight"; suggestion = "You need meal plan or fitness plan to gain weight."}
                //console.log(finalValue);
                alert("Your BMI value：" + finalResult + '\n' +
                      "Your BMI categorie is ：" + finalValue + '\n' +
                      "Our suggestion: " + suggestion);

            }

            });
          }
        });

  }


   fitness() {
    var _that = this;
    this.props.navigator.push({
        component: FitnessPlan
      });
  }

  meal() {
   var _that = this;
   this.props.navigator.push({
       component: MealPlan
     });
 }

 account() {
  var _that = this;
  this.props.navigator.push({
      component: Account
    });
}

search() {

 var _that = this;
 this.props.navigator.push({
     component: App
   });
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

AppRegistry.registerComponent('PersonalForm', () => PersonalForm);
