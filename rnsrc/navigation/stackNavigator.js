import React, {Component} from 'react';
import {Platform, StyleSheet,Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Me from "../pages/me";
import Setting from "../pages/setting";



const  routeConfigs = {
    Me:{
        //对应一个页面，就是一个react组件
        screen: Me,
        //是深度链接(Deeplinking)对应的地址，通过映射预定义行为到唯一的链接上，
        //对于支持深度链接功能的移动应用，可以通过调用深度链接打开应用，也可跳转到应用内指定页面
        // path: 'me/:name',
        //主要用于配置页面的 navigation Header ,需要传入一个函数或者一个object，也可以在组件中用static变量配置
        navigationOptions: ({ navigation }) => ({
            header:null
        }),
    },
    Setting:{
        screen: Setting,
        navigationOptions:{
            header:null
        }
    }
}
const navigatorConfig={};

const StackNavigator = createStackNavigator(routeConfigs, navigatorConfig);

export default StackNavigator