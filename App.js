import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

//Need to import each of the used view classes
import Scanner from "./src/scanner/scanner";
import TransporterScreen from "./src/views/TransporterScreen";
import StaffScreen from "./src/views/StaffScreen";
import SchedulePage from "./src/schedule/schedulePage";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Temp Home",
  };
  render() {
    return (
      //Can only return one element so all componets must be wrapped in a parent componet
      //ex: the two views in one view
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Select a role view</Text>
        <View style={{ alignItems: "center", padding: 5 }}>
          <Button
            title="Go to Transporter View"
            onPress={() => this.props.navigation.navigate("Transporter")}
          />
        </View>
        <View style={{ alignItems: "center", padding: 5 }}>
          <Button
            title="Go to Staff View"
            onPress={() => this.props.navigation.navigate("Staff")}
          />
        </View>
      </View>
    );
  }
}

//Name of different navigation screens go here
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Transporter: TransporterScreen,
    Staff: StaffScreen,
    Scanner: Scanner,
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(AppNavigator);
