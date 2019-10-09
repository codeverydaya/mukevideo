/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class About extends Component {
    render() {

        return (
            <View style={{flex:1,justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{color: "#000"}}>About</Text>
            </View>
        );
    }
}

