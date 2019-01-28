import React from "react";
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Scanner from "./src/scanner/scanner";
import ConfirmationScreen  from "./src/views/ConfirmationScreen";

export class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Scanner />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Confirmation: ConfirmationScreen,
    Scanner: Scanner
  },
  {
    initialRouteName: "Scanner"
  }
);

export default createAppContainer(AppNavigator);
