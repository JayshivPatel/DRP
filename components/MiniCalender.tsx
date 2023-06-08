import React from "react";
import FullCalendar from "@fullcalendar/react";
import { DateClickArg } from "@fullcalendar/interaction";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

type Props = { changeDate: (date: string) => void };

export default class MiniCalender extends React.Component<Props> {
  changeDaySelected = (payload: DateClickArg) => {
    this.props.changeDate(payload.dateStr);
  };
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        nowIndicator={true}
        dateClick={this.changeDaySelected}
        contentHeight={400}
      />
    );
  }
}
