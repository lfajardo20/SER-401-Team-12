import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

//Need to import each of the used view classes
import Scanner from "./src/scanner/scanner";
import TransporterScreen from "./src/views/TransporterScreen";
import StaffScreen from "./src/views/StaffScreen";
import SignupForm from "./src/signupForm";
import { TextInput } from "react-native-gesture-handler";
import gps from "./src/gps";

class HomeScreen extends React.Component {
  state = {
    user = "",
    password = "",
    userMatches: false,
  };
  static navigationOptions = {
    title: "Arrival Notification",
  };
  render() {

    /*
    * Use this link to continue working on conditionals:
    * https://reactjs.org/docs/conditional-rendering.html
    * still have to make adjustments
    */

    return (
      //Can only return one element so all componets must be wrapped in a parent componet
      //ex: the two views in one view
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Text>Select a role view</Text>
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
        </View> */}
        <View>
          <Text>Username</Text>
          <TextInput
            placeholder="Enter your username..."
            onChangeText={(user) => this.setState({ user })}
            value={this.state.user}
          />
          <Text>Password</Text>
          <TextInput
            placeholder="Enter your password..."
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          {button}
        </View>
        <View style={{ alignItems: "center", padding: 5 }}>
          <Button
            title="Go GPS test"
            onPress={() => this.props.navigation.navigate("GPS")}
          />
        </View>
        <View style={{ alignItems: "center", padding: 5 }}>
          <Button
            title="Create new account"
            onPress={() => this.props.navigation.navigate("Signup")}
          />
        </View>
      </View>
    );
  }
  async testingFetchAsync() {
    //The url fetches to the database for the json payload
    return fetch("https://awk4q8rl4b.execute-api.us-west-1.amazonaws.com/test")
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.movies;
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Function that will check if the username inputted matches the one
  //in the database (the one passed in as a parameter).
  doesUserMatch(text) {
    if (user === "admin") {
      button = <Button title="Log in" onPress={() => this.props.navigation.navigate("Transporter")} />
    } else {
      //TODO
    }
  }
}

//Name of different navigation screens go here
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Transporter: TransporterScreen,
    Staff: StaffScreen,
    Scanner: Scanner,
    Signup: SignupForm,
    GPS: gps,
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(AppNavigator);
