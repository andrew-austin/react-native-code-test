
import React, { Component} from 'react'
import {View} from 'react-native';
import NavigationService from './navigation/NavigationService';
import { AppStackRoot } from './routes/AppStack';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class AppRoute extends Component {
    constructor(props) {
        super(props);
    }
     
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#303b3d', }}   >
                <AppStackRoot
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </View>
        )
    }

}

