import React from "react";
import FullCalendar from "@fullcalendar/react";
import { DateClickArg } from "@fullcalendar/interaction";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

export default class MiniCalender extends React.Component {
  changeDaySelected = (payload: DateClickArg) => {
    alert("This should change the day to " + payload.date);
  };
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        nowIndicator={true}
        dateClick={this.changeDaySelected}
      />
    );
  }
}
