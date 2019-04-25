import React, { Component } from "react";
import { Button, Platform, Text, View, StyleSheet, Picker } from "react-native";
import { Constants, Location, Permissions } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

//Export StaffScreen so App.js can call it for navigation
export default class gps extends React.Component {

  constructor(props) {
    super(props);
    this.idObj = { "id": this.props.navigation.getParam("id") };
  }

  static navigationOptions = {
    title: "gps",
  };

  //Get these corrdinates from database in later sprint
  MainPREOP = {
    Lat: 33.479214,
    Long: -112.041310,
    Lat2: 33.478670,
    Long2: -112.041833,
  }

  EASTPreop = {
    Lat: 33.479400,
    Long: -112.039399,
    Lat2: 33.478945,
    Long2: -112.040222,
  }

  EASTPACUPreop = {
    Lat: 33.480138,
    Long: -112.040565,
    Lat2: 33.479440,
    Long2: -112.039071,
  }


  state = {
    location: null,
    hasLocationPermission: null,
    GPSenabled: false,
    NetworkEnabled: false,
    CurrentLocation: "MainPREOP",
  };

  //On view mount call asynch function to get location
  componentWillMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status == "granted") {
      this.hasLocationPermission = "Location request denied.";
    }

    //Used to get network status
    let locationStatus = await Location.getProviderStatusAsync({});
    this.state.GPSenabled = locationStatus.gpsAvailable;
    this.state.NetworkEnabled = locationStatus.networkAvailable;

    //Get three locations and average them out
    let location = await Location.getCurrentPositionAsync({});
    let location_2 = await Location.getCurrentPositionAsync({});
    let location_3 = await Location.getCurrentPositionAsync({});

    //Average out the lat and long and set them to the state value of location
    location.coords.latitude = Number.parseFloat((location.coords.latitude + location_2.coords.latitude + location_3.coords.latitude) / 3).toFixed(8);
    location.coords.longitude = Number.parseFloat((location.coords.longitude + location_2.coords.longitude + location_3.coords.longitude) / 3).toFixed(8);

    this.setState({ location });

  };

  render() {
    let text = "Awaiting location...";

    //Use this var to find the difference bettween current location and defeined locations to guess what location a user is in.
    let difference = 0;

    if (this.state.hasLocationPermission) {
      text = this.state.hasLocationPermission;
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>{text}</Text>
          <Button
            title="Return"
            //On press navigate to camera object
            onPress={() => this.props.navigation.navigate("Home")}
          />
        </View>
      );
    }
    else if (this.state.location != null) {
      //Need both gps and network to get a more accurate location
      if (this.state.GPSenabled || this.state.NetworkEnabled) {
        //Long list of comparing lat and long to get current location
        //Moving to a separate function will make it prettier, so I should do that.
        if (this.state.location.coords.latitude >= this.MainPREOP.Lat2 && this.state.location.coords.latitude <= this.MainPREOP.Lat) {
          if (this.state.location.coords.longitude >= this.MainPREOP.Long2 && this.state.location.coords.longitude <= this.MainPREOP.Long) {
            this.state.CurrentLocation = "Main PREOP";
            text = "Current Location is Main PREOP.";
          }
        }
        else if (this.state.location.coords.latitude >= this.EASTPreop.Lat2 && this.state.location.coords.latitude <= this.EASTPreop.Lat) {
          if (this.state.location.coords.longitude >= this.EASTPreop.Long2 && this.state.location.coords.longitude <= this.EASTPreop.Long) {
            this.state.CurrentLocation = "East PREOP";
            text = "Current Location is East PREOP.";
          }
        }
        else if (this.state.location.coords.latitude >= this.EASTPACUPreop.Lat2 && this.state.location.coords.latitude <= this.EASTPACUPreop.Lat) {
          if (this.state.location.coords.longitude >= this.EASTPACUPreop.Long2 && this.state.location.coords.longitude <= this.EASTPACUPreop.Long) {
            this.state.CurrentLocation = "East PACU PREOP";
            text = "Current Location is East PACU PREOP.";
          }
        }
        else {
          text = "Not in a valid location." + "\n" + "Please select one from the list below.";
          return (
            <View style={styles.container}>
              <Text style={styles.paragraph}>{text}</Text>
              <Picker
                selectedValue={this.state.CurrentLocation}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ CurrentLocation: itemValue })
                }>
                <Picker.Item label="Main PREOP" value="MainPREOP" />
                <Picker.Item label="East PREOP" value="EastPREOP" />
                <Picker.Item label="East PACU PREOP" value="EastPACUPREOP" />
              </Picker>

              <Button
                title="Confirm"
                //On press navigate to confimration screen
                onPress={() => this.props.navigation.navigate("Confirmation", { id: this.idObj.id, loc: this.state.CurrentLocation })}
              />
            </View>
          );
        }
      }
      else {
        text = "GPS and Network are not enabled.";
      }
    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },
});