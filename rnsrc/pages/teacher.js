/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Head from '../components/common/head'

export default class Teacher extends Component {
    render() {
        const {navigation} = this.props;
        const params = navigation.state.params || {};

        return (
            <View style={{flex:1}}>
                {params.hasHeader ?
                    <Head title='讲师介绍'></Head>
                    :
                    null
                }
                <Text style={{ fontSize: 17, marginTop: 20, lineHeight: 24, textAlign: 'left', margin: 10,}}>
                    {
                '     互联网公司技术总监，架构师，全栈工程师有约十年的研发经验， 职业生涯开始于java，对于高并发、大数据，服务器运维有多年实战经验,近些年热衷于nodejs、前端、app相关技术，目前致力于使用js提供一整套app、前端、后端的解决方案，完善"react native+原生+webview"技术框架构建顶级app'}
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({

});