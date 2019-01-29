import React from "react";
import { Text } from "react-native";

export default class ScheduleEvent extends React.Component {
  render() {
    let { location, time, type } = this.props.event;
    return (
      <Text>
        {"Your" + time + " " + type + " appointment has arrived at " + location}
      </Text>
    );
  }
}
