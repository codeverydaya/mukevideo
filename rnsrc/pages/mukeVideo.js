/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    DeviceInfo,
    Image,
    Slider,
    TouchableWithoutFeedback,
    BackHandler
} from 'react-native';

import Video from 'react-native-video';
import Orientation from 'react-native-orientation'
import Util from '../utils/util'
import NavigatorUtil from '../navigator/navigatorUtil'
import Progress from '../components/progress'


export default class MukeVideo extends Component {

    constructor(props) {
        super(props);
        Orientation.lockToPortrait();

        this.changeScreen = this.changeScreen.bind(this);

        this.scalculateParams = this.calculateParams.bind(this);
        this.updateOrientation = this.updateOrientation.bind(this);


        this.changeRate = this.changeRate.bind(this)
        this.changeRateData = this.changeRateData.bind(this);
        this.changeProgress = this.changeProgress.bind(this)

        this.changeProgressData = this.changeProgressData.bind(this);

        this.changeCurrentTime = this.changeCurrentTime.bind(this);
        this.changeLock = this.changeLock.bind(this)


        this.scalculateParams();
    }

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
        screenOrientation: 'PORTRAIT', //屏幕
        videoRatio: {
            width: 0,
            height: 0
        },
        progressData: {
            show: true,
            top: 0,
            bottom: 0
        },
        rateDataShow: false,

        lock: false
    };

    changeLock() {
        this.setState({
            lock: !this.state.lock
        })
    }

    changeRateData() {
        if (this.state.progressData.show) {
            this.changeProgressData()
        }
        this.setState({
            rateDataShow: !this.state.rateDataShow
        })
    }


    changeRate(rate) {
        this.setState({
            rate: rate,
            rateDataShow: false
        })
        if (!this.state.progressData.show) {
            this.setState({
                progressData: {
                    show: true,
                    top: 0,
                    bottom: 0
                }
            })
            this.timeout = setTimeout(() => {
                this.changeProgressData()
            }, 10000);
        }
    }

    changeProgressData() {

        if (this.state.lock || this.state.rateDataShow) {
            return
        }

        this.timeout && clearTimeout(this.timeout)

        if (this.state.progressData.show) {
            this.setState({
                progressData: {
                    show: false,
                    top: -100,
                    bottom: -200
                }
            })

        } else {
            this.setState({
                progressData: {
                    show: true,
                    top: 0,
                    bottom: 0
                }
            })
            this.timeout = setTimeout(() => {
                this.changeProgressData()
            }, 10000);
        }


    }


    changeProgress(rate) {


        this.video.seek(rate * this.state.duration)
    };

    changeCurrentTime(rate) {
        this.setState({
            currentTime: rate * this.state.duration
        })
    }


    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        //console.log(this.getCurrentTimePercentage()+'-----')

        return (
            <View style={{
                paddingTop: this.statusHeight,
                flex: 1,
                justifyContent: Util.getWidth() > Util.getHeight() ? 'center' : 'flex-start',
                alignItems: 'center',
                backgroundColor: '#eee',
            }}>

                <View style={{width: this.videoSetting.width, height: this.videoSetting.height, overflow: 'hidden'}}
                >
                    <View style={{width: this.videoSetting.width, height: this.videoSetting.height}}>
                        <Video
                            ref={(ref) => {
                                this.video = ref
                            }}
                            source={require('../../assets/3.mp4')}
                            style={{width: '100%', height: '100%'}}
                            rate={this.state.rate}
                            paused={this.state.paused}
                            volume={this.state.volume}
                            muted={this.state.muted}
                            resizeMode={this.state.resizeMode}
                            onLoad={this.onLoad}
                            onProgress={this.onProgress}
                            onEnd={this.onEnd}
                            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                            onAudioFocusChanged={this.onAudioFocusChanged}
                            repeat={false}
                        />
                    </View>


                    <View

                        onStartShouldSetResponder={(evt) => {
                            return true;
                        }}

                        onMoveShouldSetResponder={(evt, gestureState) => true}

                        // 开始手势操作
                        onResponderGrant={(event, gestureState) => {
                            this.changeProgressData()
                        }}
                        // 移动操作
                        onResponderMove={(event, gestureState) => {
                        }}
                        // 释放手势
                        onResponderRelease={(event, gestureState) => {
                        }}


                        onPress={() => {
                            this.changeProgressData()
                        }} style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: this.videoSetting.width,
                        height: this.videoSetting.height
                    }}>

                        <TouchableOpacity style={{marginLeft: 20}} onPress={() => {
                            this.changeLock()
                        }}>

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: '#333'
                            }}>
                                <Image style={{width: 12, height: 22,}} resizeMode="stretch"
                                       source={{uri: this.state.lock ? 'lock' : 'unlock'}}>
                                </Image>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        position: 'absolute',
                        top: 0,
                        right: this.state.rateDataShow ? 0 : -1000,
                        width: this.videoSetting.width * 0.3,
                        height: this.videoSetting.height
                    }}>

                        <TouchableOpacity onPress={() => {
                            this.changeRate(1)
                        }} style={{flex: 1, width: 60, justifyContent: 'center', alignItems: 'center',}}>

                            <Text style={{color: this.state.rate == 1 ? '#2fa6fc' : '#fff'}}>1.0</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.changeRate(1.25)
                        }} style={{flex: 1, width: 60, justifyContent: 'center', alignItems: 'center',}}>

                            <Text style={{color: this.state.rate == 1.25 ? '#2fa6fc' : '#fff'}}>1.25</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.changeRate(1.5)
                        }} style={{flex: 1, width: 60, justifyContent: 'center', alignItems: 'center',}}>

                            <Text style={{color: this.state.rate == 1.5 ? '#2fa6fc' : '#fff'}}>1.5</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.changeRate(1.75)
                        }} style={{flex: 1, width: 60, justifyContent: 'center', alignItems: 'center',}}>

                            <Text style={{color: this.state.rate == 1.75 ? '#2fa6fc' : '#fff'}}>1.75</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.changeRate(2)
                        }} style={{flex: 1, width: 60, justifyContent: 'center', alignItems: 'center',}}>

                            <Text style={{color: this.state.rate == 2 ? '#2fa6fc' : '#fff'}}>2.0</Text>

                        </TouchableOpacity>

                    </View>


                    <View style={{
                        position: 'absolute',
                        top: this.state.progressData.top,
                        left: 0,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: this.videoSetting.width,
                        height: 30,
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }}>

                        <TouchableOpacity onPress={() => {
                            if (Util.getWidth() < Util.getHeight()) {
                                NavigatorUtil.goBack();
                            } else {
                                this.state.screenOrientation = 'PORTRAIT';
                                Orientation.lockToPortrait()
                            }

                        }} style={{width: 50, height: 30}}>

                            <Image style={{width: 25, height: 25}} source={{uri: 'back'}} resizeMode="contain"></Image>
                        </TouchableOpacity>

                        <Text style={{color: '#fff', fontSize: 14}}> 1-1 课程介绍</Text>
                    </View>


                    <View style={{
                        position: 'absolute',
                        bottom: this.state.progressData.bottom,
                        left: 0,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: this.videoSetting.width,
                        height: 60,
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>

                        {/* 进度条开始*/}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            width: '100%',
                            height: 20,
                            backgroundColor: 'rgba(0,0,0,0)'
                        }}>

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,0)'
                            }}>

                                <Text style={{
                                    color: '#fff',
                                    fontSize: 12
                                }}>{Util.formSecondTotHMS(this.state.currentTime)}</Text>
                            </View>


                            <Progress changeCurrentTime={this.changeCurrentTime} changeProgress={this.changeProgress}
                                      pLengh={this.getCurrentTimePercentage()} style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,0)'
                            }}>

                            </Progress>

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,0)'
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 12
                                }}>{Util.formSecondTotHMS(this.state.duration)}</Text>
                            </View>

                        </View>

                        {/* 进度条结束*/}


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            height: 40,
                            backgroundColor: 'rgba(0,0,0,0)'
                        }}>


                            <View style={{
                                ustifyContent: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,0)'
                            }}>

                                <TouchableOpacity onPress={() => {
                                    this.setState({paused: !this.state.paused})
                                }} style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%'
                                }}>
                                    <Image style={{height: 25, width: 25,}}
                                           source={{uri: this.state.paused ? "play" : 'pause'}} resizeMode="contain"/>
                                </TouchableOpacity>
                            </View>


                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,0)'
                            }}>

                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    width: 50,
                                    height: '100%',
                                    backgroundColor: 'rgba(0,0,0,0)'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        this.changeRateData()
                                    }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}>
                                        <Text
                                            style={{color: '#fff'}}> {this.state.rate == 1 ? '倍速' : this.state.rate + 'x'}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    width: 50,
                                    height: '100%',
                                    backgroundColor: 'rgba(0,0,0,0)'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        this.changeScreen();
                                    }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}>
                                        <Image style={{height: 20, width: 20,}}
                                               source={{uri: "bigscreen"}} resizeMode="contain"/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </View>

                </View>
            </View>
        );
    }

    calculateParams() {
        const {navigation} = this.props;
        const params = navigation.state.params;
        this.videoRatio = {
            width: 1066,
            height: 1388,
            rate: 1066 / 1388
        }
        this.videoRatio = {
            width: 1152,
            height: 720,
            rate: 1152 / 720
        }
        //视频分辨率
        this.videoRatio = {
            width: params.videodata.videoWidth,
            height: params.videodata.videoHeight,
            rate: params.videodata.videoWidth / params.videodata.videoHeight
        }


        //屏幕的状态
        let onitialOrientation = Orientation.getInitialOrientation()

        //屏幕实际宽高
        this.screen = {
            width: Util.getWidth(),
            height: Util.getHeight(),
            rate: Util.getWidth() / Util.getHeight() //宽高比
        }


        this.isPortrait = true;//默认竖屏
        //判断横竖屏
        if (this.screen.width > this.screen.height) {
            this.isPortrait = false;//横屏
        }

        //计算视频的显示宽高
        //视屏宽高比

        //视屏的显示
        this.videoScreen = {
            width: Util.getWidth(),
            height: Util.getHeight(),
            // rate:Util.getWidth()/Util.getHeight() //宽高比
        }

        this.statusHeight = 0;
        //竖屏
        if (this.isPortrait) {

            if (DeviceInfo.isIPhoneX_deprecated) {
                this.statusHeight = 44;
                this.videoScreen.height = this.videoScreen.height - 44;

            } else {
                this.statusHeight = 20;
                this.videoScreen.height = this.videoScreen.height - 20;
            }
            if(Util.isPlatform("android")){
                this.statusHeight = 0;
            }
        } else {
            if (DeviceInfo.isIPhoneX_deprecated) {
                this.statusHeight = 0;
                this.videoScreen.width = this.videoScreen.width - 60;
            }
        }

        //宽高比
        this.videoScreen.rate = this.videoScreen.width / this.videoScreen.height


        let videoSetting = {}
        this.videoSetting = videoSetting;
        if (this.videoScreen.rate > this.videoRatio.rate) {
            videoSetting.height = this.videoScreen.height
            videoSetting.width = videoSetting.height * this.videoRatio.rate;
        } else {
            videoSetting.width = this.videoScreen.width
            videoSetting.height = videoSetting.width / this.videoRatio.rate
        }


    }

    changeScreen() {

        if (Util.getWidth() < Util.getHeight()) {
            Orientation.lockToLandscapeRight()
        } else {
            this.state.screenOrientation = 'PORTRAIT';
            Orientation.lockToPortrait()
        }
        setTimeout(()=>{
            this.updateOrientation()
        },1000)
    }

    componentDidMount() {
        Orientation.addOrientationListener(this.updateOrientation);

        this.timeout = setTimeout(() => {
            this.changeProgressData()
        }, 50000);
    }

    componentWillUnmount() {
        this.timeout && clearTimeout(this.timeout)
        Orientation.lockToPortrait()
        Orientation.removeOrientationListener(this.updateOrientation);
    }

    updateOrientation(orientation) {
        this.calculateParams();
        this.setState({
            ...this.state
        })
    }


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

    onProgress = (data) => {
        this.setState({currentTime: data.currentTime});
        // console.log(data.currentTime + "hhh");
    };

    onEnd = () => {
        this.setState({paused: true})
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({paused: !event.hasAudioFocus})
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration) * 100 + '%';
        }
        return 0 + '%';
    };

    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({rate})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({resizeMode})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({volume})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    tr: {
        transform: [{rotateZ: '90deg'}]
    },
    textStyle: {
        paddingLeft: 10,
        paddingTop: 25,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    btnStyle: {
        paddingRight: 10,
        paddingTop: 25,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingTop: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        fontSize: 25,
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
});