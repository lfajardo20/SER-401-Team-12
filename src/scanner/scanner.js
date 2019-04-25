import React, { Component } from "react";
import { Alert, View, Text, Vibration, StyleSheet } from "react-native";
import { Camera, BarCodeScanner, Permissions, Location } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Scanner extends Component {
  state = {
    scannedItem: {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    },
  };

  async UNSAFE_componentWillMount() {
    let retVal = await Location.getProviderStatusAsync()
    if (!retVal.locationServicesEnabled) {
      alert("Please enable your device's location service and try again.");
      this.props.navigation.navigate("Transporter");
    }

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
    if (type == 2) {
      //this.resetScanner();
      //this.renderAlert("This barcode is Supported", `${type} : ${this.processBarcode(data)}`);
      //this.props.navigation.navigate("YOUR_NEXT_SCREEN", { ean: data });
    }
    else {
      this.renderAlert("This barcode is not supported.", `${type} : ${data}`);
    }
  };

  processBarcode(data) {
    //bacodes follow format of A00000000
    if (data != null) {
      if (data.charAt(0) == "A") {
        return data.substr(1, data.length - 1);
      }
      else {
        return null;
      }
    }
  }

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
    const { navigate } = this.props.navigation;

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
              {`Scanned \n type: ${type} \n Patient ID: ${this.processBarcode(data)}`}
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

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.navigate("GPS", { id: this.processBarcode(data) });
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