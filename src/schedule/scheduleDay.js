import React from "react";
import ScheduleEvent from "./ScheduleEvent";

export default class ScheduleDay extends React.Component {
  render() {
    let { events, day } = this.props;
    return (
      <div>
        <title>Events for: {day}</title>
        <br />
        {events.map(event => (
          <ScheduleEvent event={event} key={event} />
        ))}
      </div>
    );
  }
}
