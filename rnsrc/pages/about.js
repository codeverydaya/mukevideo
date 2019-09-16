/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Head from '../components/common/head'

export default class About extends Component {
    render() {
        const {navigation} = this.props;
        const params = navigation.state.params || {};

        return (
            <View style={{flex:1}}>

            </View>
        );
    }
}

