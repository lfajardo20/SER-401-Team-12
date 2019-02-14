import React, { Component} from "react";
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

//Export StaffScreen so App.js can call it for navigation
export default class gps extends React.Component 
{   
  static navigationOptions = {
    title: "gps",
  };
  
    //Get these corrdinates from database in later sprint
    MainPREOP = {
        Lat: 33.4790322,
        Long: -112.0412945,
        Lat2: 33.47949146,
        Long2: -112.04125568,
    }
  
    EASTPreop = {
        Lat: 33.47907207,
        Long: -112.03988092,
        Lat2: 33.4791054,
        Long2: -112.03986336,
    }
  
    EASTPACUPreop = {
        Lat: 33.4797482,
        Long: -112.0411164,
        Lat2: 33.47956037,
        Long2: -112.0399038,
    }

  
  state = {
    location: null,
    hasLocationPermission: null,
    GPSenabled: null,
    NetworkEnabled: null,
  };

  UNSAFE_componentWillMount() 
  {
      this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status == 'granted')
    {
        this.hasLocationPermission = "Location request denied";
    }

    //Used to get network status
    let locationStatus = await Location.getProviderStatusAsync({});
    this.state.GPSenabled = locationStatus.gpsAvailable;
    this.state.NetworkEnabled = locationStatus.networkAvailable;

    let location = await Location.getCurrentPositionAsync({}); 
    this.setState({ location });
  };

  render() 
  {
    let text = 'Awaiting location';
    
    if (this.state.hasLocationPermission) 
    {
      text = this.state.hasLocationPermission;
    } 
    else
    {
        //Need both gps and network to get a more accurate location
        if(this.state.GPSenabled && this.state.NetworkEnabled)
        {
          //Long list of comparing lat and long to get current location
          //Moving to a separate function will make it prettier, so I should do that.      
          if(this.state.location.coords.latitude >= this.MainPREOP.Lat2 && this.state.location.coords.latitude <= this.MainPREOP.Lat)
          {
              if(this.state.location.coords.longitude >= this.MainPREOP.Long2 && this.state.location.coords.longitude <= this.MainPREOP.Long)
              {
                text = "Current Location is Main PREOP.";
              }
          }
          else if(this.state.location.coords.latitude >= this.EASTPreop.Lat2 && this.state.location.coords.latitude <= this.EASTPreop.Lat)
          {
              if(this.state.location.coords.longitude >= this.EASTPreop.Long2 && this.state.location.coords.longitude <= this.EASTPreop.Long)
              {
                text = "Current Location is East PREOP.";
              }
          }
          else if(this.state.location.coords.latitude >= this.EASTPACUPreop.Lat2 && this.state.location.coords.latitude <= this.EASTPACUPreop.Lat)
          {
              if(this.state.location.coords.longitude >= this.EASTPACUPreop.Long2 && this.state.location.coords.longitude <= this.EASTPACUPreop.Long)
              {
                text = "Current Location is East PACU PREOP.";
              }
          }
          else
          {          
            text = "Error not in a valid location. \n" + this.state.location.coords.latitude + " ," + this.state.location.coords.longitude;
          }
        }
        else
        {
            text = "GPS and Network are not enabled."
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