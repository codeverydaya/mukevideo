/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import  Head from '../components/common/head'

export default class Expect extends Component  {
  render() {
    const {navigation} = this.props;
    const params = navigation.state.params||{};

    return (
        <View style={{flex:1}}>
          {params.hasHeader?
              <Head title='敬请期待'></Head>
              :
              null
          }
          <Text style={{ fontSize: 17, marginTop: 20, lineHeight: 24, textAlign: 'left', margin: 10,}}>
            {
              '     接下来希望带大家全栈式开发一款直播app。包括react native、koa2、mongodb，ffmpeg，redux等技术，干货满满，大家也尽情期待吧'
            }
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({

});