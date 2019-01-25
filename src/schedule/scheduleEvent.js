import React from "react";

export default class ScheduleEvent extends React.Component {
  render() {
    let { location, time, type } = this.props.event;
    return (
      <div>
        {"Your" + time + " " + type + " appointment has arrived at " + location}
      </div>
    );
  }
}
