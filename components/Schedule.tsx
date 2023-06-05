import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { EventClickArg } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

export default class Schedule extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={false}
        height="auto"
        expandRows={true}
        dayHeaders={false}
        allDaySlot={false}
        eventClick={openEventDetailsOnClick}
        dateClick={openBookingScreen}
        events={events}
      />
    );
  }
}

function openBookingScreen(payload: DateClickArg) {
  alert("Should allow us to book here");
  payload;
}

function openEventDetailsOnClick(payload: EventClickArg) {
  alert("Appointment information should pop up here?");
  payload;
}

//Placeholder - to be added into the Clinic Component later for API request
const events = [
  {
    title: "Default Event 1",
    startTime: "10:00",
    endTime: "10:10",
  },
  {
    title: "Default Event 2",
    startTime: "13:30",
    endTime: "13:50",
  },
];
