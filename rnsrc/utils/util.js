import Dimensions from 'Dimensions';
import React, {Component} from 'react';
import {
    PixelRatio,
    Platform,
    DeviceInfo,
    DeviceEventEmitter,
} from 'react-native';

export default class Util {
    //屏幕尺寸
    static size = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
    //获取百分比的屏幕高度
    static getPercentHeight(percent) {
        return Dimensions.get('window').height * percent / 100;
    }

    static getPercentWidth(percent) {
        return Dimensions.get('window').width * percent / 100;
    }
    static setSize() {
        this.size = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }
    }

    static stateHeight(platform, height, elseHeight) {
        // if (Platform.OS == platform) {
        //     return height;
        // } else {
        //     return  height;
        // }
        //安卓4.4以上状态栏和苹果一样，4.4以前不可以设置沉浸式
        if (Platform.OS == 'android') {
            if (this.isAndroidUp44()) {
                return height;
            } else {
                return elseHeight;
            }
        } else {
            return height;
        }

    }

    //获取屏幕宽度
    static getWidth() {
        return Dimensions.get('window').width;
    }

    //获取屏幕高度
    static getHeight() {
        return Dimensions.get('window').height;
    }

    //根据平台获取域名  tmplx002.xycjinfu.com
    static getDomain() {
        let domain = 'https://ios.xiaoyoucai.com';
        if (Platform.OS == "android") {
            domain = 'https://android.xiaoyoucai.com';
        }
        return domain;
    }

    //根据宽度确定高度、根据iphone7作为标准
    static getRate() {
        return Dimensions.get('window').width / 375;
    }

    //根据宽度确定高度、根据iphone7作为标准
    static getFontRate() {
        return Dimensions.get('window').width / 375;
    }

    //字体根据宽度确定大小
    static getFontSize(size) {
        let changeSize = size * Dimensions.get('window').width / 375;
        //四舍五入
        changeSize = Math.ceil(changeSize);
        return changeSize;
    }

    //是否是指定平台
    static isPlatform(platform) {
        if (Platform.OS == platform) {
            return true;
        } else {
            return false;
        }
    }


    //判断是否是IPhoneX
    static isIPhoneX() {
        return DeviceInfo.isIPhoneX_deprecated
    }

    //把传入的秒数格式化成 时分秒（00：00：00），
    static formSecondTotHMS(second) {
        second = parseInt(second);
        let hh = 0, mm = 0, ss = 0;
        if (second > 0) {
            ss = parseInt(second % 60);
            mm = second / 60;
            mm = parseInt(mm % 60);
            hh = parseInt(second / 3600);
        }
        // 补零
        let zero = function (v) {
            return (v >> 0) < 10 ? "0" + v : v;
        };

        if (hh == 0) {
            return zero(mm) + ':' + zero(ss);
        } else {
            return zero(hh) + ':' + zero(mm) + ':' + zero(ss);
        }
    }
}

