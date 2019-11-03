/**
 * @author lmy
 * @date 2019/03/05 下午12:37
 * @desc
 */
import React, {Component} from 'react';
import {Text, View,TouchableOpacity,ScrollView,ImageBackground} from 'react-native';
import {createDrawerNavigator } from 'react-navigation';

import NavigatorUtil from './navigatorUtil'

import  BottomTabNavigator from './bottomTabNavigator'
import {NavigationActions,StackActions} from 'react-navigation';

const RouteConfigs = {
    BottomTabNavigator: {
        screen: BottomTabNavigator,
    },

}

const DrawerNavigatorConfig ={
    initialRouteName: 'BottomTabNavigator',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,
    tabBarPosition:'bottom',
    //drawerWidth:300,
    contentComponent:(props)=>(
        <View style={{flex:1,backgroundColor: '#fff'}}>
            <ScrollView style={{flex:1,backgroundColor: '#fff'}}>
                <ImageBackground   style={{height:150,width:'100%'}} source={{uri: "bg_muke"}} resizeMode="stretch" >
                </ImageBackground>

                <View style={{width:'100%',justifyContent: 'center',alignItems: 'center' }}>


                    <TouchableOpacity
                        onPress={()=>{
                            const {navigation} =  props;
                            navigation.closeDrawer();
                            navigation.navigate('About',{hasHeader:true})
                        }}
                        style={{width:'90%',flexDirection:'row' ,height:35,justifyContent: 'flex-start',alignItems: 'center' }}>
                        <Text  style={{marginLeft:10}}>关于慕课视频</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            const {navigation} =  props;
                            navigation.closeDrawer();
                            navigation.navigate("Setting")
                        }}
                        style={{width:'90%',flexDirection:'row' ,height:35,justifyContent: 'flex-start',alignItems: 'center' }}>
                        <Text  style={{marginLeft:10}}>设置</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}

const DrawerNavigator = createDrawerNavigator(RouteConfigs,DrawerNavigatorConfig);
export default DrawerNavigator;