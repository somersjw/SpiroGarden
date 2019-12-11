import React from "react";
import { ScrollView, View, Image, TextInput, Text } from "react-native";

export default class SplashScreen extends React.Component {
    componentWillMount () {
        var {navigate} = this.props.navigation;
        setTimeout (() => {
            navigate('Home');
        }, 2000);
    }

    render () {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    style={{width: 400, height: 400}}
                    source={require('../assets/spirogarden-logo.png')}
                />
            </View>
        );
    }
}