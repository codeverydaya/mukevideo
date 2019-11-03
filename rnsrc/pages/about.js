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
                <Head title='关于慕课视频'></Head>
                <Text style={{ fontSize: 17, marginTop: 20, lineHeight: 24, textAlign: 'left', margin: 10,}}>
                    {
                    '    这是一个使用react native实现的视频播放器，同时兼容ios与android两大平台，在此基础上，我会不间断的更新新功能，为大家分享新的技术'
                    }

                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    welcome: {
        fontSize: 17, marginTop: 20, lineHeight: 24, textAlign: 'left', margin: 10,
    },
});