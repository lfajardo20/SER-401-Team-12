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
import SignupForm from "./src/signupForm";
import { TextInput, RotationGestureHandler } from "react-native-gesture-handler";
import gps from "./src/gps";

class HomeScreen extends React.Component {
  //fetch method to post to the api endpoint to get the type of user logged in.
  postTest(url = "", data = {}) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(response => response.json());
  }

  state = {
    user: "",
    password: "",
    userMatches: false,
    appState: AppState.currentState,
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
  render() {
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

          {/*postTest(
            "https://9tkh5sthia.execute-api.us-west-1.amazonaws.com/beta",
            { userName: this.state.user, password: this.state.password }
          )
            .then(data => console.log(JSON.stringify(data)))
          .catch(error => console.error(error))*/}

          {/*These two if statements are to check if the user input
          in the username text field is identified as a staff member
          or transporter and will redirect accordingly.
          These statements are poorley designed and still need work.
          Right now it loads the button based on input.
          */}
          {this.state.user === "admin" && //staff view
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
            ))}
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
