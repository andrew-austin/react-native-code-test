/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import NavigationService from './../../navigation/NavigationService'
import styles from './style'
import {
    View,
    Animated, Easing, Dimensions
} from 'react-native';

export default class SplashView extends React.Component {
    constructor(props) {
        super(props);
        this.anim1 = new Animated.Value(0);
        this.anim2 = new Animated.Value(1);
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        header: null
    });

    componentDidMount() {
        this.firstAnimation();
        setTimeout(() => {
            this.secondAnimation();
        }, 1200);

        this.setSplashTimeout();
    }


    firstAnimation = () => {
        this.anim1.setValue(0);
        Animated.timing(this.anim1, {
            toValue: 1,
            duration: 1200,
            easing: Easing.in
        }).start(this.firstAnimation);
    }

    secondAnimation = () => {
        this.anim2.setValue(0);
        Animated.timing(this.anim2, {
            toValue: 1,
            duration: 1200,
            easing: Easing.in
        }).start(this.secondAnimation);
    }

    setSplashTimeout(){
        setTimeout(() => {
            this.onSplashComplete();
        }, 3000);
    }

    onSplashComplete = () => {
        NavigationService.navigate('userListView', { });
    }
    render() {
        return (
            <View style={{ flex: 1, position: 'relative', backgroundColor: 'white' }}>
                <View
                    style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 2 }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <Animated.View
                            style={[styles.circle, {
                                width: this.anim1.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 180]
                                }),
                                height: this.anim1.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 180]
                                }),
                                borderRadius: 180 / 2,
                                opacity: this.anim1.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                })
                            }]}>
                        </Animated.View>
                    </View>

                </View>
                <View
                    style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 1 }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <Animated.View
                            style={[styles.circle, {
                                width: this.anim2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [180, 250]
                                }),
                                height: this.anim2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [180, 250]
                                }),
                                borderRadius: 250 / 2,
                                opacity: this.anim2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0]
                                })
                            }]}>
                        </Animated.View>
                    </View>

                </View>

                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 , zIndex: 3 }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center', alignItems: 'center'
                    }} >
                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#7EAF03',borderColor: '#7EAF03' }}>

                        </View>
                    </View>
                </View>

            </View>


        );
    }
}

