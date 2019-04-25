import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import SchedulePage from "../schedule/schedulePage";
//Export StaffScreen so App.js can call it for navigation
export default class StaffScreen extends React.Component {
  static navigationOptions = {
    title: "Staff",
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#DC143C' }}>
        <SchedulePage />
      </View>
    );
  }
}
