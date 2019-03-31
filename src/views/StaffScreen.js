import React, { Component } from "react";
import { Button, View, Text } from "react-native";

import SchedulePage from "../schedule/schedulePage";
//Export StaffScreen so App.js can call it for navigation
export default class StaffScreen extends React.Component {
  //Reading the data (title) from the previous screen
  //This is to set the title of the screen as the username
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
    };
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <SchedulePage />
      </View>
    );
  }
}
