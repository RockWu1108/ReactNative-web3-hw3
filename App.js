import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';

import HomeScreen from './src/HomeScreen.js';
import HomeDetailScreen from './src/HomeDetailScreen.js';
import ProfileScreen from './src/ProfileScreen.js';
import {Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
export default function App() {

  function detailStack(){
    return(
        <Stack.Navigator
        initialRouteName = 'Exchange'
        screenOptions ={{
          headerStyle :{backgroundColor:'tomato'},
          headerTintColor : 'white',
          headerBackTitle :'返回'
        }}
        >
          <Stack.Screen name="Exchange" component={HomeScreen} />
          <Stack.Screen name="ExchangeDetail" component={HomeDetailScreen} />

      </Stack.Navigator>
    )
  }

  function profileStack(){
    return(
        <Stack.Navigator
        initialRouteName = 'Transaction'
        screenOptions ={{
          headerStyle :{backgroundColor:'tomato'},
          headerTintColor : 'white',
          headerBackTitle :'返回'
        }}
        >
          <Stack.Screen name="Transaction" component={ProfileScreen} />
      </Stack.Navigator>
    )
  }
    // 創建底部Tab
    const Tab = createBottomTabNavigator();
    //上下頁跳轉
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
  
        <Tab.Navigator
        screenOptions = { ({route}) =>({
          tabBarIcon : ({color})=>{
            let iconUri ;
            if(route.name == 'Transaction'){
               //iconName = 'water'
               //自行設定icon image
               iconUri ='https://cdn.iconscout.com/icon/premium/png-512-thumb/wallet-224-207902.png';
            }
            else if (route.name =='Exchange'){
              iconUri ='https://pbs.twimg.com/profile_images/1153200823347736578/AYrxiFLM.jpg';
  
            }
            return<Image source={{uri :iconUri}} style={{width:30 , height:30}}/>
          }
        })}
        
          tabBarOptions = {{
            activeTintColor : 'tomato' , 
            inactiveTintColor : 'gray'
          }}
          >
          <Tab.Screen name="Exchange" component={detailStack} />
          <Tab.Screen name="Transaction" component={profileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  
  