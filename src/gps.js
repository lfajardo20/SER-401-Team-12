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
  async UNSAFE_componentWillMount() {
    await Location.getProviderStatusAsync().then(function (retVal) {
      if (!retVal.locationServicesEnabled) {
        alert("Please enable your device's location service and try again.");
        this.props.navigation.navigate("Transporter");
      }
    });
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

    await Location.getProviderStatusAsync().then(function (retVal) {
      if (!retVal.locationServicesEnabled) {
        alert("Please enable your device's location service and try again.");
        this.props.navigation.navigate("Transporter");
      }
    });

  };

  render() {
    let text = "Awaiting location...";

    //Use this var to find the difference bettween current location and defeined locations to guess what location a user is in.
    let difference = 0;

    if (this.state.hasLocationPermission) {
      text = this.state.hasLocationPermission;
      return (
        <View style={styles.container}>
          <Text style={styles.textNav}>{text}</Text>
          <View style={styles.buttonStyle}>
            <Button
              style={{ color: 'white', elevation: 0 }}
              color='red'
              title="Return"
              //On press navigate to camera object
              onPress={() => this.props.navigation.navigate("Home")}
            />
          </View>
        </View>
      );
    }
    else if (this.state.location != null) {
      //Need both gps and network to get a more accurate location
      if (true) {

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
              <Text style={styles.textNav}>{text}</Text>
              <Picker
                style={styles.borderedPicker}
                selectedValue={this.state.CurrentLocation}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ CurrentLocation: itemValue })
                }>
                <Picker.Item label="Main PREOP" value="Main PREOP" />
                <Picker.Item label="East PREOP" value="East PREOP" />
                <Picker.Item label="East PACU PREOP" value="East PACUPREOP" />
              </Picker>
              <View style={styles.buttonStyle}>
                <Button
                  style={{ color: 'white', elevation: 0, marginTop: 100 }}
                  color='red'
                  title="Confirm"
                  //On press navigate to confimration screen
                  onPress={() => this.props.navigation.navigate("Confirmation", { id: this.idObj.id, loc: this.state.CurrentLocation })}
                />
              </View>
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
        <Text style={styles.textNav}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DC143C',
    alignItems: 'center',
    justifyContent: "center"
  },
  textNav: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: "center",
  },
  buttonStyle: {
    height: 40,
    width: '50%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttontextColor: {
    color: 'red',
    fontWeight: 'bold',
  },
  borderedPicker: {
    //borderColor: "black",
    marginBottom: 80,
    height: 50,
    width: 250,
  },
});