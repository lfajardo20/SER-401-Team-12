import React from "react";
import { Text } from "react-native";

export default class ScheduleEvent extends React.Component {
  render() {
    let { location, name, type } = this.props.event;
    return <Text>{type + " for " + name + " at " + location}</Text>;
  }
}
