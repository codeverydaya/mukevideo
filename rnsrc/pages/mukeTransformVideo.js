/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc 视频播放页面,通过旋转平移实现全屏
 */

import React, {Component} from 'react';
import {PanResponder,StyleSheet,Text,TouchableOpacity, View,Image,Button,DeviceInfo} from 'react-native';
import Util from "../utils/util";
import Video from 'react-native-video';
import Progress from '../components/mukeVideo/transformProgress';
import Orientation from 'react-native-orientation'
export default class MukeVideo  extends Component {
    constructor(props) {
        super(props);
        //页面时初始事，锁定屏幕为竖屏
        Orientation.lockToPortrait();

        //初始化页面参数
        this.state = {
            rate: 1,// 用于倍速播放，0.0-暂停播放，1.0-正常速率播放，其他值 - 自定义速率，例如0.5慢速播放或者2.0快速播放
            volume: 1,//视频播放的音量控制，1.0-满音量， 0.0-将音频静音
            muted: false,//控制音频是否静音，(true、false)
            resizeMode: 'contain',//视频缩放模式
            paused: true,//控制视频播放暂停 (true、false) ，以上是Video组件的受控的参数

            duration: 0.0,//视频的总时长
            currentTime: 0.0,//视频的当前播放进度，单位为秒
            rateShow:false,//控制进度条的显示
            lock:false,//控制锁屏按钮的显示
            controlShow:true,//用于控制层的控制
            isPortrait:true,//初始为竖屏
        }
        this.calculateParams(true);
        //处理触摸事件
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponder:  (evt, gestureState) => {
                return true;
            },
            onStartShouldSetResponderCapture: (evt, gestureState) => {
                return false;
            },
            onMoveShouldSetResponderCapture: (evt, gestureState) => {
                return false;
            },
            onPanResponderGrant: (evt, gestureState) => {
                //显示控制层
                if(!this.state.controlShow){
                    this.setState({
                        controlShow:true
                    })
                }
                //清除定时器
                this.timeOut && clearTimeout(this.timeOut)
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log('onPanResponderMove')
            },
            onPanResponderRelease: (evt, gestureState) => {

                //重新设置定时器，用于隐藏控制层
                this.timeOut = setTimeout(()=>{
                    this.setState({
                       // controlShow:false
                    })
                },3000)
            },
            onPanResponderTerminate:(evt, gestureState) => {
            },
        });

    }

    //直接改变屏幕的方向
    updateOrientation=()=> {

        let isPortrait = !this.state.isPortrait;
        this.setState({
            isPortrait:isPortrait
        })

        this.state.isPortrait = isPortrait;
        this.calculateParams(isPortrait);

    }
    componentDidMount(){

        this.timeOut = setTimeout(()=>{
            this.setState({
                // controlShow:false,
            })
        },3000);
    }
    componentWillUnmount()  {
        this.timeOut&& clearTimeout(this.timeOut);
        //关闭页面时让系统竖屏
        Orientation.lockToPortrait();

    }

    render() {
        const {navigation} = this.props;
        const {videoData} = navigation.state.params ;
        const  videoScreen = this.videoScreen;
        //由于没有服务器视频地址，项目中模拟两类(宽高比>1,<=1)视频
        const addr4=require("../assets/4.mp4");
        const addr1=require("../assets/1.mp4");
        let addr= videoData.videoUrl.indexOf("4.") != -1? addr4:addr1;
        let height = Util.getHeight();
        let width = Util.getWidth();
        let translateX = 0;
        let translateY = 0;
        if(!this.state.isPortrait){
            height = Util.getWidth();
            width = Util.getHeight();
            translateY= (Util.getHeight()- Util.getWidth())/2
             translateX= (Util.getWidth()- Util.getHeight())/2
        }

        return (
            <View style={{transform:[{translateX:translateX},{translateY:translateY},{rotateZ:this.state.isPortrait?'00deg':'90deg'}],height:height,width:width,paddingTop:videoScreen.paddingTop,paddingLeft:videoScreen.paddingLeft ,
                justifyContent: this.state.isPortrait?'flex-start' : 'center', alignItems: this.state.isPortrait?'center' : 'flex-start', backgroundColor: '#ccc',}}>

                <View style={{width: videoScreen.width, height: videoScreen.height,backgroundColor:'black'}}>
                    <Video ref={(ref) => {this.video = ref}}

                           source={addr}
                           style={{width: '100%', height: '100%'}}
                           rate={this.state.rate}
                           paused={this.state.paused}
                           volume={this.state.volume}
                           muted={this.state.muted}
                           resizeMode={this.state.resizeMode}
                           repeat={false}
                           onLoad={this.onLoad}
                           onProgress={this.onProgress}
                           onEnd={this.onEnd}
                    />
                    <View {...this.panResponder.panHandlers} style={{ justifyContent: 'center', alignItems: 'flex-start',width: '100%', height: '100%',position:'absolute',top:0,left:0,backgroundColor:'rgba(0,0,0,0,)',overflow:'hidden'}}>
                        {/*header*/}
                        <View style={{flexDirection:'row',justifyContent: 'flex-start', alignItems: 'center',width:'100%', height: 50,position:'absolute',top:(this.state.controlShow&&!this.state.lock)?0:-1000,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>

                            <TouchableOpacity
                                onPress={()=>{
                                    if (this.state.isPortrait) {
                                        navigation.goBack()
                                    } else {
                                        this.updateOrientation();
                                    }
                                }}
                                style={{height: '100%',width: 40,justifyContent: 'center', alignItems: 'center'}}>
                                <Image style={{height: 30,width: 30 }}  source={{uri:'back'}}/>
                            </TouchableOpacity>

                            <Text style={{color:'#fff'}}>{videoData.title}</Text>
                        </View>
                        {/*rate*/}
                        <View style={{zIndex:100,width: 120, height: '100%',justifyContent: 'center', alignItems: 'center',position:'absolute',top:0,right:this.state.rateShow?0:-1000,backgroundColor:'rgba(0,0,0,0.5)'}}>

                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({
                                        rate:1,
                                        rateShow:false
                                    })
                                }}
                                style={{flex:1,width: '100%',justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color:'#fff'}}>1.0</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({
                                        rate:1.25,
                                        rateShow:false
                                    })
                                }}
                                style={{flex:1,width: '100%',justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color:'#fff'}}>1.25</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({
                                        rate:1.5,
                                        rateShow:false
                                    })
                                }}
                                style={{flex:1,width: '100%',justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color:'#fff'}}>1.5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({
                                        rate:1.75,
                                        rateShow:false
                                    })
                                }}
                                style={{flex:1,width: '100%',justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color:'#fff'}}>1.75</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({
                                        rate:2.0,
                                        rateShow:false
                                    })
                                }}
                                style={{flex:1,width: '100%',justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color:'#fff'}}>2.0</Text>
                            </TouchableOpacity>
                        </View>
                        {/*control*/}
                        <View style={{width:'100%', height: 60,position:'absolute',bottom:(this.state.controlShow&&!this.state.lock)?0:-1000,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
                            <View style={{flexDirection:'row',width: '100%', height: '50%',backgroundColor:'rgba(0,0,0,0)'}}>

                                <View style={{justifyContent: 'center', alignItems: 'center', width: 50, height: '100%', backgroundColor: 'rgba(0,0,0,0)'}}>
                                    <Text style={{color: '#fff', fontSize: 12}}>{Util.formSecondTotHMS(this.state.currentTime)}</Text>
                                </View>

                                <Progress changeCurrentTime={this.changeCurrentTime} isPortrait={this.state.isPortrait} changeProgress={this.changeProgress}
                                          pLengh={this.getCurrentTimePercentage()} style={{justifyContent: 'center', alignItems: 'center', flex: 1, height: '100%', backgroundColor: 'rgba(0,0,0,0)'}}/>

                                <View style={{justifyContent: 'center', alignItems: 'center', width: 50, height: '100%', backgroundColor: 'rgba(0,0,0,0)'}}>
                                    <Text style={{color: '#fff', fontSize: 12}}>{Util.formSecondTotHMS(this.state.duration)}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:'row',justifyContent: 'center', alignItems: 'center',  width: '100%', height: '50%',backgroundColor:'rgba(0,0,0,0)'}}>

                                <View style={{flexDirection:'row',justifyContent: 'flex-start', alignItems: 'center', flex:1, height: '100%',}}>

                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({
                                                paused:!this.state.paused
                                            })
                                        }}
                                        style={{height: '100%',width: 50,justifyContent: 'center', alignItems: 'center'}}>
                                        <Image style={{height: 25,width: 25 }}  source={{uri:this.state.paused?"play":'pause'}}/>
                                    </TouchableOpacity>

                                </View>
                                <View style={{flexDirection:'row',justifyContent: 'flex-end', alignItems: 'center',  flex:1, height: '100%',backgroundColor:'rgba(0,0,0,0)'}}>

                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({
                                                rateShow:true
                                            })
                                        }}
                                        style={{height: '100%',width: 50,justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color:'#fff'}}>{this.state.rate==1?"倍速":this.state.rate+"x"}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.updateOrientation();
                                        }}
                                        style={{height: '100%',width: 50,justifyContent: 'center', alignItems: 'center'}}>
                                        <Image style={{height: 25,width: 25 }}  source={{uri:'bigscreen'}}/>
                                    </TouchableOpacity>

                                </View>


                            </View>
                        </View>
                        {/*lock*/}
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({
                                    lock:!this.state.lock
                                })
                            }}
                            style={{width: 30, height: 30,justifyContent: 'center', alignItems: 'center',backgroundColor:'#333',marginLeft:this.state.controlShow?20:-1000,borderRadius:15}}>
                            <Image style={{height: 22,width: 12 }}  source={{uri:this.state.lock?'lock':'unlock'}} resizeMode='stretch'/>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    //计算视频的显示布局
    calculateParams=(isPortrait)=> {
        const {navigation} = this.props;
        const params = navigation.state.params;
        const videoData = params.videoData;

        //获取视频分辨率
        this.videoRatio = {
            width: videoData.videoWidth,
            height: videoData.videoHeight,
            rate: videoData.videoWidth / videoData.videoHeight
        }

        let  width = Util.getWidth();
        let  height =  Util.getHeight();
        if(!this.state.isPortrait){
            width = Util.getHeight();
            height =  Util.getWidth();
        }
        //屏幕分辨率
        this.screen = {
            width: width,
            height: height,
            rate: width / height//宽高比
        }

        //初始化视频可用分辨率
        this.videoScreen = {
            width: width,
            height: height,
            paddingTop:0,//用于竖屏
            paddingLeft:0//用于横屏
            // rate:Util.getWidth()/Util.getHeight() //宽高比
        }
        //计算视频可用分辨率
        this.statusHeight = 0;
        //竖屏
        if (isPortrait) {
            if (DeviceInfo.isIPhoneX_deprecated) {
                this.statusHeight = 30;
                this.videoScreen.height = this.videoScreen.height - 60;
            } else {
                this.statusHeight = 20;
                this.videoScreen.height = this.videoScreen.height - 20;
            }
            //安卓不开启沉浸式时为0，
            if(Util.isPlatform("android")){
                this.statusHeight = 0;
            }
        } else {//横屏
            if (DeviceInfo.isIPhoneX_deprecated) {
                this.statusHeight = 30;
                this.videoScreen.width = this.videoScreen.width -60;
            }else{
                this.statusHeight = 0
            }
        }

        //竖屏设置top 横屏设置left
        if(isPortrait){
            this.videoScreen.paddingTop =this.statusHeight;
            this.videoScreen.paddingLeft =0;
        }else{
            this.videoScreen.paddingTop =0;
            this.videoScreen.paddingLeft =this.statusHeight;
        }


        //可用屏幕宽高比
        this.videoScreen.rate = this.videoScreen.width / this.videoScreen.height

        //竖屏时候特殊处理，不全屏
        if(isPortrait){
            if (this.videoScreen.rate < this.videoRatio.rate) {
                this.videoScreen.height = this.videoScreen.width/this.videoRatio.rate;
            }
        }

    }
    //设置视频的播放进度
    changeProgress=(rate)=>{
        this.video.seek(rate * this.state.duration)
    };

    //改变视频的播放时间
    changeCurrentTime=(rate)=> {
        this.setState({
            currentTime: rate * this.state.duration
        })
    }

    //获取视频当期播放的百分比
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration) * 100 + '%';
        }
        return 0 + '%';
    };
    //加载视频获取视频相关参数
    onLoad = (data) => {
        this.setState({duration: data.duration});
        //获取视频实际分辨率
        this.videoRatio = {
            width: data.width,
            height: data.height
        }
        // console.log(data.duration + "时长");
        // console.log(data );
    };

    //获取视频的播放进度
    onProgress = (data) => {
        this.setState({currentTime: data.currentTime});
        // console.log(data.currentTime + "hhh");
    };
    //视频播放完回调
    onEnd = () => {
        this.setState({paused: true})
        this.video.seek(0)
    };
}
