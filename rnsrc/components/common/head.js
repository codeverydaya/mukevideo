/*
 * author: lmy
 * createTime:   2018-03-27
 * useTo     :  有奖吐槽
 * */

import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    DeviceInfo,
} from 'react-native';
import Util from '../../utils/util';
import  NavigatorUtil from '../../navigation/navigatorUtil'

export default class  Head extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <View style={{backgroundColor:Util.isPlatform('android')?'#363131':'#f5f5f5',width:'100%'}}>
                    <View style={[{height:40*Util.getRate(),marginTop:((Util.isPlatform("ios")?20:0)+(DeviceInfo.isIPhoneX_deprecated?15:0)),backgroundColor:Util.isPlatform('android')?'#363131':'#f5f5f5',flexDirection:'row',justifyContent: 'center',alignItems: 'center'}]} >

                        <View style={[{flex:1,justifyContent: 'center',alignItems: 'center'}]}>
                            <Text  allowFontScaling={false}    numberOfLines={1} style={{fontSize:15,color:Util.isPlatform('android')?'#fff':'#000'}}>{this.props.title}</Text>
                        </View>

                        <TouchableOpacity style={{position:'absolute',left:0,backgroundColor:'transparent',flexDirection:'row',height:40*Util.getRate(),width:40*Util.getRate(),justifyContent: 'center',alignItems: 'center'}}
                                          onPress={()=>NavigatorUtil.goBack()}>
                            <Image style={{height:28*Util.getRate(),width:30*Util.getRate()}} source={{uri:'left'}} resizeMode="stretch">
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
        );
    }

    componentDidMount() {

    };
}