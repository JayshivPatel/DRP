import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { EventApi, EventClickArg } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Modal, PaperProvider, Portal, Text, Button } from "react-native-paper";
import { View, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default class Schedule extends React.Component<
  {
    title: string;
    date: string;
  },
  {
    showModalOne: boolean;
    showModalTwo: boolean;
    selectedEvent?: EventApi;
    selectedDate?: Date;
    showAppointmentModal: boolean;
    text: string;
    selectedDuration: number;
  }
> {
  state = {
    showModalOne: false,
    showModalTwo: false,
    selectedEvent: undefined,
    selectedDate: undefined,
    showAppointmentModal: false,
    text: "",
    selectedDuration: 5,
  };

  openEventDetailsOnClick = (payload: EventClickArg) => {
    this.setState({ selectedEvent: payload.event });
    this.setState({ showModalOne: true });
  };

  openBookingScreen = (payload: DateClickArg) => {
    this.setState({ selectedDate: payload.date });
    this.setState({ showModalTwo: true });
  };

  openAppointmentModal = () => {
    this.setState({ showAppointmentModal: true });
  };

  onChangeText = (text: string) => {
    this.setState({ text: text });
  };

  onChangeSelectedDuration = (durationValue: number) => {
    this.setState({ selectedDuration: durationValue });
  };

  render() {
    const {
      showModalOne,
      showModalTwo,
      selectedEvent,
      selectedDate,
      showAppointmentModal,
      text,
    } = this.state;

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

    const durations = [
      { label: "5 minutes", value: 5 },
      { label: "10 minutes", value: 10 },
      { label: "15 minutes", value: 15 },
      { label: "20 minutes", value: 20 },
      { label: "25 minutes", value: 25 },
      { label: "30 minutes", value: 30 },
    ];

    const bookingTime = selectedDate
      ? `${selectedDate.getHours()}:${selectedDate.getMinutes()}`
      : null;

    return (
      <PaperProvider>
        <View style={styles.container}>
          <Text variant="titleLarge" style={styles.clinicHeader}>
            {this.props.title}: {this.props.date.slice(0, 10)}
          </Text>
          <Button
            icon="cog"
            textColor="white"
            buttonColor="#2196f3"
            mode="outlined"
            onPress={() =>
              confirm("Are you sure you wish to cancel this clinic?")
            }
          >
            Cancel Clinic
          </Button>
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
              <Button onPress={() => alert("Appointment Cancelled")}>
                Cancel Appointment
              </Button>
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
              <label>Appointment Reason:</label>
              <TextInput
                style={{
                  marginBottom: 30,
                  borderWidth: 1,
                  padding: 10,
                  height: 200,
                }}
                multiline
                numberOfLines={3}
                onChangeText={this.onChangeText}
                placeholder="Enter Appointment details and info"
              />
              <label>Enter Duration: </label>
              <Picker
                style={{ marginBottom: 30 }}
                selectedValue={this.state.selectedDuration}
                onValueChange={(itemValue, _) =>
                  this.onChangeSelectedDuration(itemValue)
                }
              >
                {durations.map((duration) => (
                  <Picker.Item label={duration.label} value={duration.value} />
                ))}
              </Picker>
              <View style={styles.checkboxContainer}>
                <label>Send patient SMS confirmation: </label>
                <input type="checkbox" id="smsConfirmed" />
              </View>

              <Button onPress={this.openAppointmentModal}>
                Book Appointment for {bookingTime}
              </Button>
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
    color: "black",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
});
