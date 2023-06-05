import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { EventClickArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { View } from 'react-native';
import { Button, Menu, Divider, PaperProvider, Modal } from 'react-native-paper';

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

function openBookingScreen(payload: EventClickArg) {
  alert("Should allow us to book here")
}

function openEventDetailsOnClick(payload: EventClickArg) {
  alert("Appointment information should pop up here?")
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
