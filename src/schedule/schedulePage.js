import React from "react";
import { View, SectionList, Text } from "react-native";
import ScheduleDay from "./scheduleDay";

export default class SchedulePage extends React.Component {
  state = {
    fetchedData: null,
  };

  componentDidMount() {
    return fetch("https://ka388qldlb.execute-api.us-west-1.amazonaws.com/test/")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            fetchedData: responseJson,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    let { fetchedData } = this.state;

    if (!fetchedData) {
      return <Text>Loading Schedule...</Text>;
    }
    //turns JSON props into an array of objects usable by SectionList
    let sectionData = fetchedData.map(event => eventTranslator(event));
    return (
      <View>
        <SectionList
          renderItem={({ item, index }) => (
            <ScheduleDay key={index} data={item} />
          )}
          sections={sectionData}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

//translates JSON representation of events into SectionList usable format
function eventTranslator(day) {
  return {
    title: day.date,
    data: [day], //puts the object into an array for SectionList
  };
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

const exampleData2 = [
  {
    date: "2019-02-08T01:49:42.455Z",
    schedule: [
      {
        type: "Appendectomy",
        name: "John Doe",
        location: "OP206",
        time: "12:00",
      },
      {
        type: "Other Surgery",
        name: "Jane Doe",
        location: "OP201",
        time: "13:30",
      },
    ],
  },
  {
    date: "2019-02-08T01:49:42.455Z",
    schedule: [
      {
        type: "API Test",
        name: "HELLO WORLD",
        location: "OP206",
        time: "12:00",
      },
    ],
  },
];