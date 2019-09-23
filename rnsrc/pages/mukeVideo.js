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

import Util from '../utils/util'

export default class MukeVideo extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <View style={{
                paddingTop: this.statusHeight,
                flex: 1,
                justifyContent: Util.getWidth() > Util.getHeight() ? 'center' : 'flex-start',
                alignItems: 'center',
                backgroundColor: '#eee',
            }}>
            </View>
        );
    }

}