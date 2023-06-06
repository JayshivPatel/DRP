import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { EventClickArg } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import { Button, View, Text } from "react-native";

export default class Schedule extends React.Component {
  state = {
    showModalOne: false,
    showModalTwo: false,
    selectedEvent: null,
  };

  openEventDetailsOnClick = (payload: EventClickArg) => {
    this.setState({ selectedEvent: payload.event });
    this.setState({ showModalOne: true });
  };

  openBookingScreen = (payload: DateClickArg) => {
    this.setState({ selectedEvent: payload.date });
    this.setState({ showModalTwo: true });
  };

  render() {
    const { showModalOne, showModalTwo, selectedEvent } = this.state;

    const containerStyle = {
      padding: 20,
      innerHeight: 500,
      outerHeight: 50,
    };

    const modalOneViewStyle = {
      paddingVertical: 50,
    };

    const modalTwoViewStyle = {
      paddingVertical: 50,
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
          dateClick={this.openBookingScreen}
          slotMinTime={"08:00:00"}
          slotMaxTime={"20:00:00"}
          slotEventOverlap = {false}
          nowIndicator = {true}
          events={events}
        />

        <Portal>
          <Modal
            visible={showModalOne}
            onDismiss={() => this.setState({ showModalOne: false })}
            contentContainerStyle={containerStyle}
          >
            <View style={modalOneViewStyle}>
              <Text style={{ marginBottom: 30 }}>
                Random stuff here More stuff even more stuff waffling
              </Text>
              <Button
                title="Cancel appointment"
                onPress={() => alert("Appointment Cancelled")}
              />
            </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal
            visible={showModalTwo}
            onDismiss={() => this.setState({ showModalTwo: false })}
            contentContainerStyle={containerStyle}
          >
            <View style={modalTwoViewStyle}>
              <Text style={{ marginBottom: 30 }}>random stuff</Text>
              <Button
                title={`Book Appointment for ${selectedEvent}`}
                onPress={() => alert("Appointment Booked")}
              />
            </View>
          </Modal>
        </Portal>
      </PaperProvider>
    );
  }
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
