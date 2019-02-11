import React, { Component} from "react";
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

//Export StaffScreen so App.js can call it for navigation
export default class gps extends React.Component 
{   
  static navigationOptions = {
    title: "gps",
  };
  
  state = {
    location: null,
    hasLocationPermission: null,
  };

  componentWillMount() 
  {
      this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status == 'granted')
    {
        this.hasLocationPermission = "Location request denied";
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let text = 'Awaiting location';
    if (this.state.hasLocationPermission) 
    {
      text = this.state.hasLocationPermission;
    } 
    else if (this.state.location) 
    {
      text = "Latitude:" + this.state.location.coords.latitude + " Longitude:" + this.state.location.coords.longitude;
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});