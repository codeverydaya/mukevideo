/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */


import React, {Component} from 'react';
import {Platform, Image,PanResponder, StyleSheet, Text, View, TouchableOpacity, NativeModules} from 'react-native';
import Util from "../utils/util";


export default class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1,justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{color: "#000"}}>Welcome</Text>
            </View>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
}


