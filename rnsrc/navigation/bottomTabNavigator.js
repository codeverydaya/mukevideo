/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,View,DeviceEventEmitter,} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import BottomTabBar from '../components/common/bottomTabBar'
import  NavigatorUtil from './navigatorUtil';

import  Hot from '../pages/hot'
import  MaterialTopTabNavigator from './materialTopTabNavigator'


const BottomTabNavigatorRouteConfigs =
        {
            Hot: {
                screen: Hot,
                navigationOptions: {
                    tabBarLabel: ' 热门',
                    tabBarIcon: ({tintColor, focused}) => (
                        <BottomTabBar focused={focused} activeImage={"hota"} inactiveImage={"hot"}
                                        />
                    ),
                    tabBarOnPress:async (props)=>{
                        const {navigation,defaultHandler} = props;
                        defaultHandler();
                    }
                }
            },
            Me: {
                screen: MaterialTopTabNavigator,
                navigationOptions: {
                    tabBarLabel: '我',
                    tabBarIcon: ({tintColor, focused}) => (
                        <BottomTabBar focused={focused} activeImage={"mea"} inactiveImage={"me"}
                                      />
                    ),
                    tabBarOnPress:async (props)=>{
                        const {navigation,defaultHandler} = props;
                        defaultHandler();
                    }
                }
            },

        }

//BottomTabNavigator默认配置
const BottomTabNavigatorConfig  =
    {
        initialRouteName: 'Hot',//初始页面
        tabBarOptions: {
            activeTintColor: '#2fd4f9',
            inactiveTintColor: '#cdcdcd',
            tabStyle: {},
            labelStyle: {
                fontSize: 14
            },
            style:{
                height:52
            },


        },

    }


const BottomTabNavigator = createBottomTabNavigator(BottomTabNavigatorRouteConfigs,BottomTabNavigatorConfig);


export default BottomTabNavigator


