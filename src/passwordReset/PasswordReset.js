import React, { Component } from "react";
import { Text, Button, View } from "react-native";
import { RNCamera } from "react-native-camera";

export default class BarcodeScanner extends Component {
  state = {
    camera: {
      type: RNCamera.Constants.Type.back,
      flashMode: RNCamera.Constants.FlashMode.auto,
      barcodeFinderVisible: true,
    },
  };
  render() {
    return (
      <View>
        stuff<div>nesting to make sure formatting works</div>
      </View>
    );
  }
}
