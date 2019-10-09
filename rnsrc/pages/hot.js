/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,FlatList,Animated,ScrollView,TouchableOpacity} from 'react-native';
import  Util  from '../utils/util'

export default class Hot extends Component {

    constructor(props){
        super(props);
    }


    render(){
        return (
            <View style={{flex:1,justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{color: "#000"}}>Hot</Text>
            </View>
        );
    }
    shouldComponentUpdate(){
    }
    componentDidMount(){
        const {navigation} = this.props;
        NavigatorUtil.stackNavigation = navigation;
        console.log("Hot didMount")
        console.log(JSON.stringify(navigation));
        console.log(navigation)
    }
    componentWillUnmount(){
    }

}