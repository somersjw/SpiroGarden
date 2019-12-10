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
            <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
                <Text> Yo </Text>
            </View>
        );
    }
}