/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Easing, Animated} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
import StackNavigator from './stackNavigator';
import Welcome from '../pages/welcome';
import DrawerNavigator from './drawerNavigator';
const routeConfigs = {
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            header: null
        }
    },
    StackNavigator: {
        screen: StackNavigator,
        navigationOptions: {
            header: null
        }
    },
}

const navigatorConfig = {
    initialRouteName: 'Welcome',//初始页面
}

const SwitchNavigator = createSwitchNavigator(routeConfigs, navigatorConfig);
export default SwitchNavigator;
