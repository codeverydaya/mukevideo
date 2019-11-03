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
        this.state = {
            countDown: 5//倒计时
        }

    }

    render() {
        return (
            <View style={{  flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff',}}>

                <Image source={{uri: "a1024"}} style={{width: 80, height: 80}}></Image>
                <Text style={{color: "#36aaf9", fontSize: 24, marginTop: 5}}>慕课视频</Text>

                <TouchableOpacity onPress={() => {
                    const {navigation} = this.props;
                    navigation.navigate("StackNavigator");}}
                    style={{backgroundColor: 'rgba(0,0,0,0.3)',borderRadius:5,width:60, justifyContent: 'center', alignItems: 'center',height:25,position: 'absolute', right: 30, top: 50}}>
                    <Text style={{color:'#fff'}}>跳过 {this.state.countDown}</Text>
                </TouchableOpacity>

                <Text style={{position: 'absolute', bottom: 100, color: "#36aaf9", fontSize: 25}}>www.mooc.com</Text>





            </View>
        );
    }

    componentDidMount() {
        this.setInterval = setInterval(() => {
            if (this.state.countDown == 0) {
                const {navigation} = this.props;
                navigation.navigate("StackNavigator");
            } else {
                this.setState({
                    ...this.state,
                    countDown: this.state.countDown-1
                });
            }

        }, 1000)
    }

    componentWillUnmount() {
        this.setInterval && clearInterval(this.setInterval);
    }
}


