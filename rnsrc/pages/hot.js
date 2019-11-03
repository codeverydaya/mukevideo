/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,FlatList,Animated,ScrollView,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import  Util  from '../utils/util'
import VideoData from "../mockdata/videodata";
import NavigatorUtil from '../navigation/navigatorUtil'

export default class Hot extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[],
        }
        for(let i=0;i<50;i++){
            let item ={
                name:'ing',
                data: i+'你好----'+i
            }
            item.key=""+i;
            this.state.data.push(item);
        }
    }


    render(){

        let width = (Util.getWidth()-2)/3;
        let height = width;
        return (
            <ScrollView
                ref={"scrollView"}
                automaticallyAdjustContentInsets={false}
                horizontal={false}
                style={{ flex: 1 }}

            >
                <LinearGradient start={{ x : 0.0, y : 0 }} end={{ x : 1, y : 0 }}
                                locations={[ 0.0, 1 ]}
                                colors={[ '#2fd4f9',   '#2fa6fc' ]}
                                style={{width:Util.getWidth(),backgroundColor:"#fff",borderBottomWidth:1,borderBottomColor:'#f5f5f5'}}>
                    <Text  style={{color:'#fff',lineHeight:50,paddingTop:20,paddingLeft:10,fontSize:18}}>热门视频</Text>
                </LinearGradient>

                <View style={{flexWrap:'wrap',flexDirection:'row',width:Util.getWidth()}}>


                    { this.state.data.map((item,i)=> {
                        let picNum=Math.floor(Math.random()*10);
                        if(picNum==0||picNum==10){
                            picNum=1;
                        }
                        let imageHeight = width;
                        let imageWidth = height;
                        let whRate = VideoData[picNum].width/VideoData[picNum].height;
                        if(whRate>1){
                            imageWidth = imageWidth*whRate;
                        }else{
                            imageHeight = imageWidth/whRate;
                        }


                        return (
                            <TouchableOpacity onPress={()=>{
                                NavigatorUtil.pushPage('MukeVideo',{videoData:VideoData[picNum]})}}
                              key={i} style={{marginBottom:1,width: width+(i%3==1?2:0),backgroundColor:'#fff',height:height, justifyContent: 'center', alignItems: 'center',
                            }}>
                                <View style={{backgroundColor: '#fff',width: width,height:height , justifyContent: 'flex-start', alignItems: 'center',overflow:'hidden'}}>

                                    <Image
                                        style={{width:imageWidth,height:imageHeight}} source={{uri:VideoData[picNum].pic}} resizeMode="contain"  ></Image>

                                </View>


                            </TouchableOpacity>)
                    })
                    }
                </View>
            </ScrollView>
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