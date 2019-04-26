import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import { StackActions, NavigationActions } from "react-navigation";

import SchedulePage from "../schedule/schedulePage";
//Export StaffScreen so App.js can call it for navigation
export default class StaffScreen extends React.Component {
  constructor(props) {
    super(props);
    this.id = { id: this.props.navigation.getParam("id") };
    this.doPostAppData();
  }

  //Reading the data (title) from the previous screen
  //This is to set the title of the screen as the username
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
    };
  };

  state = {
    tableHead: ["Date", "mrNumber", "Account Number"],
    data: null,
    multipleRows: false,
  };

  componentDidMount() {
    resetStack = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })],
    });
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.dispatch(resetStack);
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  doPostAppData() {
    return fetch(
      "https://ia7gon58j7.execute-api.us-west-1.amazonaws.com/schedule",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.id),
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        objResponse = JSON.parse(responseJson);
        Obj2dArray = new Array();

        if (objResponse.results.length > 1) {
          for (i = 0; i < objResponse.results.length; i++) {
            ObjArray = [
              objResponse.results[i].date
                .replace("T", " ")
                .replace("Z", " ")
                .substring(1, objResponse.results[i].date.length - 5),
              objResponse.results[i].mrNumber,
              objResponse.results[i].accountNum,
            ];
            Obj2dArray.push(ObjArray);
          }

          this.setState({
            multipleRows: true,
          });
        } else if (objResponse.results.length == 1) {
          Obj2dArray = [
            objResponse.results[0].date
              .replace("T", " ")
              .replace("Z", " ")
              .substring(1, objResponse.results[0].date.length - 5)
              .replace("Z", " "),
            objResponse.results[0].mrNumber,
            objResponse.results[0].accountNum,
          ];
        } else {
          Obj2dArray = [];
        }
        this.setState({
          data: Obj2dArray,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Table borderStyle={{ borderWidth: 1, borderColor: "#6a2e31" }}>
          <Row
            data={this.state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          {this.state.multipleRows ? (
            <Rows data={this.state.data} textStyle={styles.text} />
          ) : (
            <Row data={this.state.data} textStyle={styles.text} />
          )}
        </Table>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#c53b43" },
  text: { margin: 3 },
});
