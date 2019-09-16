/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import  Head from '../components/common/head'

export default class CourseContent extends Component  {
  render() {
    const {navigation} = this.props;
    const params = navigation.state.params||{};

    return (
        <View style={{flex:1}}>
          {params.hasHeader?
              <Head title='课程内容'></Head>
              :
              null
          }
          <Text style={{ fontSize: 17, marginTop: 20, lineHeight: 24, textAlign: 'left', margin: 10,}}>
            {
              '    本课程使用react native实现一个视频播放器，使用react navigation作为导航器。app同时兼容ios和安卓两大平台，播放器的主要功能包括倍速播放、全屏的切换，分辨率的适配，视频的播放暂停、播放进度的调节，动画的效果制作等'
            }

          </Text>
        </View>
    );
  }
}
const styles = StyleSheet.create({

});