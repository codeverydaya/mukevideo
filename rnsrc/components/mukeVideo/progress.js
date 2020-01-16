/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc 进度条
 */

import React, {Component} from 'react';
import {
    View,PanResponder,
    NativeModules
} from 'react-native';
import Util from '../../utils/util';

export default class Progress extends Component {

    constructor(props) {
        super(props);
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.pageX = 0;//记录触摸按钮的位置
        this.isMove = false;//是否拖动
        //进度条的位置和长度
        this.progressLocation = {
            pageX: 0,
            width: 0,
        }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponder:  (evt, gestureState) => {
                return true;
            },

            onPanResponderGrant: (evt, gestureState) => {
                this.onStart(evt, gestureState);
            },
            onPanResponderMove: (evt, gestureState) => {
                this.onMove(evt, gestureState);
            },
            onPanResponderRelease: (evt, gestureState) => {
                this.onEnd(evt, gestureState);
            },
            //有竞争时候，不释放响应者角色
            onPanResponderTerminationRequest:(evt, gestureState) => {
              return false;
            },
            onPanResponderTerminate:(evt, gestureState) => {
            },
        });
    }
    onStart(e, g) {
        //获取 按钮的 x的位置
        this.pageX = e.nativeEvent.pageX;
        this.isMove = true;
    }

    //触摸点移动时回调
    onMove(e, g) {

        //获取手指相对屏幕 x的坐标，并设计拖动按钮的位置，拖动按钮不能超出进度条的位置
        this.pageX = e.nativeEvent.pageX;

        if (e.nativeEvent.pageX < this.progressLocation.pageX) {
            this.pageX = this.progressLocation.pageX;
        } else if (e.nativeEvent.pageX > (this.progressLocation.pageX + this.progressLocation.width - 10)) {
            //-10的目的是为了修正触摸点的直径，防止超过100%
            this.pageX = this.progressLocation.pageX + this.progressLocation.width - 10;
        }
        this.setState({
            ...this.state
        })
        //通过百分比计算视频的播放时间
        this.props.changeCurrentTime((this.pageX - this.progressLocation.pageX) / this.progressLocation.width)
    }

    //触摸结束时回调
    onEnd(e, g) {
        //触摸事件结束后，设置视频的播放进度
        this.props.changeProgress((this.pageX - this.progressLocation.pageX) / this.progressLocation.width)
        this.isMove = false;
    }

    render() {
        return (
            //{/*进度条的父元素*/}
            <View onLayout={(event) => {
                {
                   // let {x, y, width, height} = event.nativeEvent.layout;
                    //拿到这个view的x位置和宽度
                    NativeModules.UIManager.measure(event.target, (x, y, width, height, pageX, pageY) => {
                        //安卓手机获取的值与ios不一样，特殊处理
                        if(Util.isPlatform("android")){
                            x=pageX - Util.getWidth();
                        }
                        this.progressLocation = {
                            name: 'progressLocation',
                            pageX:x,
                            width: width,
                        }
                    })
                }
            }}
                  style={this.props.style}>

                 {/*播放进度，灰色的进度条*/}
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 2, backgroundColor: '#999'}}>

                    {/*播放进度，白色的进度条*/}
                    <View style={{justifyContent: 'center', alignItems: 'center', width: this.isMove ? ((this.pageX - this.progressLocation.pageX) / this.progressLocation.width * 100 + '%') : this.props.pLengh, height: 2, backgroundColor: '#fff'}}>
                    </View>

                    {/*拖动按钮，为了扩大触摸的面积，为其设置了一个10*10的父级元素*/}
                    <View {...this.panResponder.panHandlers}
                          style={{justifyContent: 'center', alignItems: 'center', width: 10, height: '100%',}}>
                        <View style={{borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 10, height: 10, backgroundColor: '#fff'}}>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    componentDidMount() {
    };
}
