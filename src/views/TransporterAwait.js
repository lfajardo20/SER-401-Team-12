import React, { Component } from "react";
import { FlatList, ActivityIndicator, Text, View, StyleSheet, AppRegistry, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

//Export StaffScreen so App.js can call it for navigation
export default class TransporterAwait extends React.Component {
    static navigationOptions = {
        title: "Transporter wait",
    };

    state = {
        confirmed: null,
        id: null,
        isLoading: false,
    }

    constructor(props) {
        //Get objects from previous view
        super(props)
        this.state.id = this.props.navigation.getParam('id');
        this.state.isLoading = true;

    }

    checkConfirmation() {
        alert(this.state.id);

        return fetch('https://m74x37kx0b.execute-api.us-west-1.amazonaws.com/StaffConfirm',
            {
                method: 'POST', headers:
                    { Accept: 'application/json', 'Content-Type': 'application/json', }
                , body: JSON.stringify(this.state.id)
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.state.confirmed = responseJson.data.confirmed;
            });

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Waiting for staff to confirm</Text>
                <Button
                    title="Refresh"
                    onPress={() => this.checkConfirmation()}
                />
            </View>
        );
    }
}