import React from "react";
import { View } from "react-native";
import ScheduleDay from "./scheduleDay";

export default class SchedulePage extends React.Component {
  render() {
    return (
      <View>
        <ScheduleDay data={exampleData[0]} />
      </View>
    );
  }
}

const exampleData = [
  {
    date: "1/29/2019",
    events: [
      {
        location: "place",
        time: "14:00",
        type: "Surgery",
        name: "John Doe",
      },
      {
        location: "place",
        time: "14:00",
        type: "Surgery",
        name: "John Doe",
      },
    ],
  },
  {
    date: "1/30/2019",
    events: [
      {
        location: "place",
        time: "14:00",
        type: "Surgery",
        name: "John Doe",
      },
      {
        location: "place",
        time: "14:00",
        type: "Surgery",
        name: "John Doe",
      },
    ],
  },
];
