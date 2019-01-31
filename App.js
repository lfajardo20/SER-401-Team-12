import React from "react";
import { StyleSheet, View } from "react-native";
//import Scanner from "./src/scanner/scanner";
import SchedulePage from "./src/schedule/schedulePage";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SchedulePage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
