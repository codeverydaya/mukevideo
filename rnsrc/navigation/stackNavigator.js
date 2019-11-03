/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Easing,Animated} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import BottomTabNavigator from './bottomTabNavigator';
import MukeVideo from "../pages/mukeVideo";

import CourseContent from '../pages/courseContent';
import Teacher from '../pages/teacher';
import About from '../pages/about';
import Expect from '../pages/expect';
import Setting from '../pages/setting';
import DrawerNavigator from "./drawerNavigator";

const  routeConfigs = {

    DrawerNavigator:{
        screen: DrawerNavigator,
        navigationOptions:{
            header:null
        }
    },
    MukeVideo:{
        screen: MukeVideo,

        navigationOptions: ({ navigation }) => ({
            header:null
        }),
    },

    About:{
        screen: About,
        navigationOptions:{
            header:null
        }
    },
    Setting:{
        screen: Setting,
        navigationOptions:{
            header:null
        }
    },

}


const  stackNavigatorConfig={
    initialRouteName: 'DrawerNavigator',//初始页面
    navigationOptions: {
        gesturesEnabled: false,
    },

    transitionConfig: () => ({
        transitionSpec: {
            duration: 400,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const {layout, position, scene,navigation} = sceneProps;
            const { route } = scene;
            const params = route.params || {};
            //专场效果，根据modeStyle设置
            const modeStyle = params.modeStyle;
            const {index} = scene;
            const Width = layout.initWidth;
            const height = layout.initHeight;
            //沿X轴平移
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [Width, 0, -(Width - 10)],
            });
            //沿Y轴平移
            const translateY = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [height, 0, 0],
            });
            //透明度
            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });
            if(modeStyle=="up"){
                return { opacity, transform: [{ translateY }] };
            }else if(modeStyle=="opacity"){
                return {opacity};
            }else{
                return {opacity, transform: [{translateX}]};
            }
        }
    }),

}

const StackNavigator =createStackNavigator(routeConfigs,stackNavigatorConfig);
export  default StackNavigator;

