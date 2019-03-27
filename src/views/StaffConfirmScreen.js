import React, { Component } from "react";
import { FlatList, ActivityIndicator, Text, View, StyleSheet, AppRegistry, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

//Export StaffScreen so App.js can call it for navigation
export default class StaffConfirmScreen extends React.Component {
    static navigationOptions = {
        title: "Staff Confirm",
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Temp blank screen</Text>
            </View>
        );
    }
}