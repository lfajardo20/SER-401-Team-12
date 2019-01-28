import React, { Component } from "react";
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

//Export ConfirmationScreen so App.js can call it for navigation
export default class ConfirmationScreen extends React.Component {
  static navigationOptions = {
    title: 'Confirmation',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>    
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Is the patient data correct?</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  title="Yes"
                  onPress={() => this.props.navigation.navigate('Scanner')}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  title="No"
                  onPress={() => this.props.navigation.navigate('Scanner')}
                />
            </View>
        </View>
    );
  }
}