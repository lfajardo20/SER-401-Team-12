import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  AppState,
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

//Need to import each of the used view classes
import Scanner from "./src/scanner/scanner";
import TransporterScreen from "./src/views/TransporterScreen";
import StaffScreen from "./src/views/StaffScreen";
import ConfirmationScreen from "./src/views/ConfirmationScreen";
import SignupForm from "./src/signupForm";
import { TextInput, RotationGestureHandler } from "react-native-gesture-handler";
import gps from "./src/gps";

class HomeScreen extends React.Component {
  state = {
    user: "",
    password: "",
    appState: AppState.currentState,
    errors: {},
    submitResponse: null,
  };

  static navigationOptions = {
    title: "Arrival Notification",
  };

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match("inactive|background") &&
      nextAppState === "active"
    ) {
      //Almost done.
      //ERROR/BUG: If anything was typed on the login screen and go to a different screen
      //the text will stay in the text boxes even though we reset the view to the login.
      //SOLUTION(POTENTIAL): Call the createStackNAvigator again and reset the app.
      this.setState({ user: "", password: "" });
      this.props.navigation.navigate("Home");
      console.log("App is back from background.");
    }
    this.setState({ appState: nextAppState });
  };

  //function to retrieve the user tpe based on the user info passed
  //this will execute correctly and load a view if the username and password
  //are correct and found on the DB.
  postLogin = info => {
    return fetch(
      "https://9tkh5sthia.execute-api.us-west-1.amazonaws.com/beta/",
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
        userType = JSON.stringify(responseJson); //payload response with the usertype

        //load view according to user type
        if (JSON.stringify(responseJson).match("doctor")) {
          this.props.navigation.navigate("Staff");
        } else if (JSON.stringify(responseJson).match("transporter")) {
          this.props.navigation.navigate("Transporter");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  //Function that gets the info entered by the user
  //and calls a post function and passes the info
  //to verify the info.
  validateUser = () => {
    let { user, password } = this.state;

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

//Name of different navigation screens go here
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Transporter: TransporterScreen,
    Confirmation: ConfirmationScreen,
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
