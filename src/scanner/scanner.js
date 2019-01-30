import React, { Component } from "react";
import { Alert, View, Text, Vibration, StyleSheet } from "react-native";
import { Camera, BarCodeScanner, Permissions } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Scanner extends Component {
  state ={ scannedItem: {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  }}

  async UNSAFE_componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await this.setState({ hasCameraPermission: status === "granted" });
    await this.resetScanner();
  }

  renderAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: () => this.resetScanner() }],
      { cancelable: true }
    );
  };

  onBarCodeRead = ({ type, data }) => {
    if (
      (type === this.state.scannedItem.type &&
        data === this.state.scannedItem.data) ||
      data === null
    ) {
      return;
    }

    Vibration.vibrate();
    this.setState({ scannedItem: { data, type } });

    if (type.startsWith("org.gs1.EAN")) {
      // Process EAN code
      this.resetScanner();
      this.props.navigation.navigate("YOUR_NEXT_SCREEN", { ean: data });
    } else if (type.startsWith("org.iso.QRCode")) {
      // Process QRCode
      this.resetScanner();
    } else {
      this.renderAlert("This barcode is not supported.", `${type} : ${data}`);
    }
  };

  resetScanner() {
    this.scannedCode = null;
    this.setState({
      scannedItem: {
        type: null,
        data: null,
      },
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { type, data } = this.state.scannedItem;
    const {navigate} = this.props.navigation;

    if (hasCameraPermission === null) {
      return <Text>Requesting camera permission...</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeScanned={this.onBarCodeRead && this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
          {this.state.scannedItem && this.state.scannedItem.type ? (
            <Text style={styles.scanScreenMessage}>
              {`Scanned \n ${type} \n ${data}`}
            </Text>
          ) : (
            <Text style={styles.scanScreenMessage}>
              Focus the barcode to scan.
            </Text>
          )}
        </View>
      </View>
    );
  }
  
    handleBarCodeScanned = ({ type, data }) => 
    {
        this.props.navigation.navigate('Confirmation', {id:data})
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  scanScreenMessage: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});