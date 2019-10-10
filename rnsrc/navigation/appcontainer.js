import React, {Component} from 'react';
import {Platform, StyleSheet,Text, View} from 'react-native';import { createAppContainer } from 'react-navigation';
import StackNavigator from './stackNavigator';
const Container = createAppContainer(StackNavigator);

export default class AppContainer extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Container
                    ref={nav => {this.navigattion = nav;}}
                    onNavigationStateChange={(prevState, currentState, action) => {
                        console.log("onNavigationStateChange"+"---------")
                    }}>
                </Container>
            </View>
        );
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }

}