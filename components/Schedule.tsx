import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { EventClickArg } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Modal, PaperProvider, Portal, Text } from "react-native-paper";
import { Button, View, StyleSheet } from "react-native";

export default class Schedule extends React.Component<{
  title: string;
  date: string;
}> {
  state = {
    showModalOne: false,
    showModalTwo: false,
    selectedEvent: null,
    showAppointmentModal: false,
  };

  openEventDetailsOnClick = (payload: EventClickArg) => {
    this.setState({ selectedEvent: payload.event });
    this.setState({ showModalOne: true });
  };

  openBookingScreen = (payload: DateClickArg) => {
    this.setState({ selectedEvent: payload.date });
    this.setState({ showModalTwo: true });
  };

  openAppointmentModal = () => {
    this.setState({ showAppointmentModal: true });
  };

  render() {
    const { showModalOne, showModalTwo, selectedEvent, showAppointmentModal } =
      this.state;

    const containerStyle = {
      backgroundColor: "white",
      padding: 20,
      innerHeight: 500,
      outerHeight: 50,
    };

    const bookingStyle = {
      backgroundColor: "yellow",
      padding: 200,
      innerHeight: 50,
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
        <View style={styles.container}>
          <Text variant="titleLarge" style={styles.clinicHeader}>
            {this.props.title}: {this.props.date.slice(0, 10)}
          </Text>
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            headerToolbar={false}
            height={"auto"}
            expandRows={false}
            dayHeaders={false}
            allDaySlot={false}
            eventClick={this.openEventDetailsOnClick}
            dateClick={this.openBookingScreen}
            slotMinTime={"08:00:00"}
            slotMaxTime={"19:00:00"}
            slotEventOverlap={false}
            nowIndicator={true}
            events={events}
            slotDuration={"00:10:00"}
          />
        </View>
        <Portal>
          <Modal
            visible={showAppointmentModal}
            onDismiss={() => this.setState({ showAppointmentModal: false })}
            contentContainerStyle={bookingStyle}
          >
            <View>Test</View>
          </Modal>
        </Portal>
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
                onPress={this.openAppointmentModal}
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

const styles = StyleSheet.create({
  container: {
    maxWidth: 250,
  },
  clinicHeader: {
    color: "black"
  }
});
