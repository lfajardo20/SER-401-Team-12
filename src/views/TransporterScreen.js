import React, { Component } from "react";
import { Button, View, Text } from "react-native";

//Export TransporterScreen so App.js can call it for navigation
export default class TransporterScreen extends React.Component {
  static navigationOptions = {
    title: "Transporter",
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center",justifyContent: "center", backgroundColor: '#DC143C'}}>
        <Button color='white'
          fontSize='20'
          title="Open Camera"
          //On press navigate to camera object
          onPress={() => navigate("Scanner")}
        />
      </View>
    );
  }
}