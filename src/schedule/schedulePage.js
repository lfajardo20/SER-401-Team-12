import React from "react";
import { View } from "react-native";
import ScheduleDay from "./scheduleDay";

export default class SchedulePage extends React.Component {
  render() {
    return (
      <View>
        {exampleData.map(day => {
          return <ScheduleDay data={day} key={day} />;
        })}
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
];
