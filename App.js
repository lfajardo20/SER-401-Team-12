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
    user: "",
    password: "",
    errors: {},
    submitResponse: null,
  };

  static navigationOptions = {
    title: "Arrival Notification",
  };

  postLogin = info => {
    return fetch(
      "https://awk4q8rl4b.execute-api.us-west-1.amazonaws.com/test",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(info),
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(info));
        console.log(JSON.stringify(responseJson));
      })
      .catch(error => {
        console.error(error);
      });
  };

  validateUser = () => {
    let { user, password } = this.state;
    //if (!verify(user, password)) return; //check for user

    let info = {
      userName: user,
      password: password,
    };

    this.postLogin(info);
  };

  render() {
    let { errors } = this.state;
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
            onChangeText={user => this.setState({ user })}
            value={this.state.user}
          />
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter your password..."
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button onPress={this.validateUser} title="Login">
            Login
          </Button>
          {/* {this.state.user === "admin" && //staff view
            (this.state.password === "admin" && (
              <Button
                title="Log in"
                onPress={() => this.props.navigation.navigate("Staff")}
              />
            ))}
          {this.state.user === "admin2" && //transporter view
            (this.state.password === "password" && (
              <Button
                title="Log in"
                onPress={() => this.props.navigation.navigate("Transporter")}
              />
            ))} */}
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
}

function verify(user, password) {
  let errors = {};

  //Start to verify info from db to see if input matches db
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
