/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import  Head from '../components/common/head'
import NavigatorUtil from "../navigation/navigatorUtil";
import { SwitchActions, NavigationActions } from 'react-navigation';

export default class Setting extends Component  {
    render() {
        const {navigation} = this.props;
        const params = navigation.state.params||{};
        return (
            <View style={{flex:1}}>
                <Head title='设置'></Head>
                <View style={{justifyContent: 'center', alignItems: 'center',flex:1}}>
                    <TouchableOpacity  onPress={()=>{
                        navigation.dispatch(SwitchActions.jumpTo({routeName:"Welcome"}));
                    }}
                        style={{height:45,justifyContent: 'center',alignItems: 'center',backgroundColor:'#2fd4f9',width:180 }}>
                        <Text  style={{color:'#fff',fontSize:16}}>重新打开app</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

});