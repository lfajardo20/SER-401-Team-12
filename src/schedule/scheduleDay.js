import React from "react";
import { View, Text, SectionList } from "react-native";

import ScheduleEvent from "./ScheduleEvent";

export default class ScheduleDay extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <View style={styles.container}>
        <SectionList
          sections={data.map(day => dayTranslator(day))}
          renderItem={({ event }) => (
            <ScheduleEvent style={styles.item} event={event} />
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

function dayTranslator(day) {
  return {
    title: day.date,
    data: day.events,
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
