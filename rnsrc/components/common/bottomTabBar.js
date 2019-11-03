/**
 * @Author: lmy
 * @Date: 2019/3/13 14:38
 * @Desc
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';

export default class BottomTabBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            badgeCount:0
        }
    }

    render(){
        let {focused,inactiveImage,activeImage,hasBadge,eventName} = this.props;

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width:50,height:50,}}>
                <Image style={{ width:24,height:24}} source={{uri:focused ? activeImage:inactiveImage}} />

                {(this.state.badgeCount==0 || (!hasBadge))? null :
                    <View style={{position:'absolute',top:2,right:5,justifyContent: 'center',borderRadius:8, width:16,height:16,alignItems: 'center',backgroundColor: "#fe6d00"}}>
                        <Text style={{color:'#fff',fontSize:10}}>{this.state.badgeCount}</Text>
                    </View>
                }

            </View>
        );
    }
    componentDidMount(){
        let {hasBadge,eventName} = this.props;
        if(hasBadge && eventName){
            this.badgeCountEvent = DeviceEventEmitter.addListener(eventName,this.badgeCountEventFunction = (params) => {
                this.setState({
                   ...this.state,
                   badgeCount:params.badgeCount
               })
            });
        }

    }
    componentWillUnmount(){
        this.badgeCountEvent&&this.badgeCountEvent.remove();
    }

}