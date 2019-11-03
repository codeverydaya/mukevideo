/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */

import React, {Component} from 'react';
import {Platform, DeviceInfo,StyleSheet, View, DeviceEventEmitter,} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import NavigatorUtil from './navigatorUtil';
import CourseContent from '../pages/courseContent'

import Teacher from '../pages/teacher'
import About from '../pages/about'
import Expect from '../pages/expect'
import Util from "../utils/util";


const routeConfigs =
    {
        CourseContent: {
            screen: CourseContent,
            navigationOptions: {
                tabBarLabel: '课程内容',
                tabBarIcon: ({tintColor, focused}) => (
                    <View style={{backgroundColor: 'red', height: 50, width: 50}}></View>
                ),
            }
        },
        Teacher: {
            screen: Teacher,
            navigationOptions: {
                tabBarLabel: '关于讲师',
                tabBarIcon: ({tintColor, focused}) => (
                    <View style={{backgroundColor: 'red', height: 50, width: 50}}></View>
                ),
            }
        },

        Expect: {
            screen: Expect,
            navigationOptions: {
                tabBarLabel: '敬请期待',
                tabBarIcon: ({tintColor, focused}) => (
                    <View style={{backgroundColor: 'red', height: 50, width: 50}}></View>
                ),
            }
        },

    }

//tabNavigatorConfig
const tabNavigatorConfig =
    {
        initialRouteName: 'CourseContent',//初始页面
        swipeEnabled: false,
        tabBarOptions: {
            scrollEnabled: true,//是否支持 选项卡滚动，默认false
            activeTintColor: '#2fd4f9',
            inactiveTintColor: '#cdcdcd',
            tabStyle: {
                minWidth:80,
            },
            labelStyle: {
                fontSize: 14
            },
            style: {
                height:50+(Util.isPlatform("ios")?15:0)+(DeviceInfo.isIPhoneX_deprecated?20:0),
                justifyContent: 'flex-end',
            },
        },

    }


const MaterialTopTabNavigator = createMaterialTopTabNavigator(routeConfigs, tabNavigatorConfig);


export default MaterialTopTabNavigator


