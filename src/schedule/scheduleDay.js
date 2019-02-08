import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";

import ScheduleEvent from "./scheduleEvent";

export default class ScheduleDay extends React.Component {
  render() {
    let { data } = this.props;
    if (!data) return null;

    //turns JSON props into an array of objects usable by SectionList
    let sectionData = data.schedule.map(event => eventTranslator(event));
    return (
      <View style={styles.container}>
        <Text>{data.date}</Text>
        <SectionList
          renderItem={({ item, index }) => (
            <ScheduleEvent key={index} event={item} style={styles.item} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
          )}
          sections={sectionData}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

//translates JSON representation of events into SectionList usable format
function eventTranslator(event) {
  //extracts time field and then uses ... to put remaining fields in an object
  let { time, ...rest } = event;
  return {
    title: time,
    data: [rest], //puts the object into an array for SectionList
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
