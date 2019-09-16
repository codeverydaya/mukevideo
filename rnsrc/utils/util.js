import Dimensions from 'Dimensions';
import React, {Component} from 'react';
import {
    PixelRatio,
    Platform,
    DeviceInfo,
    DeviceEventEmitter,
} from 'react-native';

export default class Util {
    //获取屏幕宽度
    static getWidth() {
        return Dimensions.get('window').width;
    }
    //获取屏幕高度
    static getHeight() {
        return Dimensions.get('window').height;
    }
    //根据宽度确定高度、根据iphone7作为标准
    static getRate() {
        return Dimensions.get('window').width / 375;
    }
    //是否是指定平台
    static isPlatform(platform) {
        if(Platform.OS == platform) {
            return true;
        }else{
            return false;
        }
    }
    //判断是否是IPhoneX
    static  isIPhoneX(){
       return DeviceInfo.isIPhoneX_deprecated
    }
}

