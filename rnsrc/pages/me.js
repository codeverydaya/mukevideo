/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class Me extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: "#000"}}>Me</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});