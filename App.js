/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Image, Easing, Dimensions } from 'react-native';
var { width, height } = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeValue: new Animated.Value(0),
            xValue: new Animated.Value(0),
            springValue: new Animated.Value(0.5),
        };
    }
    _fadeAnimation = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 1200, //1000 miliseconds = 1 second
        }).start(
          Animated.timing(this.state.fadeValue, {
            toValue: 0,
            duration: 3000,
            easing: Easing.back, //1000 miliseconds = 1 second
        }
        ).start(()=>{
          _this._fadeAnimation();
        }));
    };
    _moveAnimation = () => {
        Animated.timing(this.state.xValue, {
            toValue: width - 100,
            duration: 1000,
            useNativeDriver: false,
            //  easing: Easing.linear,
            //  easing: Easing.back(),
            // easing: Easing.cubic,
        }).start(() => {
            //Call after finish this animation !
            Animated.timing(this.state.xValue, {
                toValue: 0,
                duration: 1000,
                // easing: Easing.linear,
                easing: Easing.back(),
                // delay: 1000,//run after 1 seconds
            });
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.animationView,
                        // {opacity: this.state.fadeValue}
                        { left: this.state.xValue },
                    ]}
                ></Animated.View>

                <TouchableOpacity style={styles.button} onPress={this._moveAnimation}>
                    <Text style={styles.buttonText}>Animate</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    animationView: {
        width: 100,
        height: 100,
        backgroundColor: 'skyblue',
    },
    button: {
        backgroundColor: 'steelblue',
        height: 45,
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        padding: 12,
        paddingHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 18,
    },
    imageView: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
    },
});
