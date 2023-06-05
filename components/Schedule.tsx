import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { EventClickArg } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export default class Schedule extends React.Component {
  state = {
    showModal: false,
    selectedEvent: null,
  };

  openEventDetailsOnClick = (payload: EventClickArg) => {
    this.setState({ selectedEvent: payload.event });
    this.setState({ showModal: true });
  };

  render() {
    const { showModal, selectedEvent } = this.state;

    const containerStyle = {
      backgroundColor: "white",
      padding: 20,
      innerHeight: 500,
      outerHeight: 50,
    };

    return (
      <PaperProvider>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          headerToolbar={false}
          height="auto"
          expandRows={true}
          dayHeaders={false}
          allDaySlot={false}
          eventClick={this.openEventDetailsOnClick}
          dateClick={openBookingScreen}
          events={events}
        />

        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => this.setState({ showModal: false })}
            contentContainerStyle={containerStyle}
          >
            <view>
              <text>Random stuff here More stuff even more stuff waffling</text>
            </view>
          </Modal>
        </Portal>
      </PaperProvider>
    );
  }
}

function openBookingScreen(payload: DateClickArg) {
  alert("Should allow us to book here");
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
