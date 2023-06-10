import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { EventApi, EventClickArg } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import {
  Modal,
  PaperProvider,
  Portal,
  Text,
  Button,
  Card,
} from "react-native-paper";
import { View, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Appointment, useAppointments, useClinics } from "../../lib/api";

const durations = [5, 10, 15, 20, 25, 30];

interface WithExtendedProps {
  extendedProps: {
    appointment: Appointment;
  };
}

export default class Schedule extends React.Component<
  {
    title: string;
    date: string;
    appointments?: Appointment[];
    handleCancel?: () => void;
    createAppointment?: (
      startTime: string,
      endTime: string,
      notes: string,
      notifySms: boolean
    ) => void;
    cancelAppointment?: (appointment: Appointment) => void;
  },
  {
    showModalOne: boolean;
    showModalTwo: boolean;
    appointment?: Appointment;
    selectedDate?: Date;
    text: string;
    selectedDuration: number;
    smsConfirmed: boolean;
  }
> {
  constructor(props: Schedule["props"]) {
    super(props);

    this.state = {
      showModalOne: false,
      showModalTwo: false,
      appointment: undefined,
      selectedDate: undefined,
      text: "",
      selectedDuration: 5,
      smsConfirmed: false,
    };
  }

  openEventDetailsOnClick = (payload: EventClickArg) => {
    this.setState({ appointment: payload.event.extendedProps.appointment });
    this.setState({ showModalOne: true });
  };

  closeEventDetails = () => {
    this.setState({ showModalOne: false });
  };

  openBookingScreen = (payload: DateClickArg) => {
    if (!this.props.createAppointment) {
      return;
    }

    this.setState({ selectedDate: payload.date });
    this.setState({ showModalTwo: true });
  };

  closeBookingScreen = () => {
    this.setState({ showModalTwo: false });
  };

  onChangeText = (text: string) => {
    this.setState({ text: text });
  };

  onChangeSelectedDuration = (selectedDuration: number) => {
    this.setState({ selectedDuration });
  };

  createAppointment = () => {
    this.closeBookingScreen();

    const startDate = this.state.selectedDate;

    if (!(this.props.createAppointment && startDate)) {
      return;
    }

    const endDate = new Date(startDate);
    endDate.setMinutes(
      endDate.getMinutes() + durations[this.state.selectedDuration]
    );

    function timeToString(date: Date): string {
      return (
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0")
      );
    }

    const startTime = timeToString(startDate);
    const endTime = timeToString(endDate);

    this.props.createAppointment(
      startTime,
      endTime,
      this.state.text,
      this.state.smsConfirmed
    );
  };

  cancelAppointment = (appointment: Appointment) => {
    this.closeEventDetails();
    this.props.cancelAppointment!(appointment);
  };

  render() {
    const { showModalOne, showModalTwo, appointment, selectedDate, text } =
      this.state;

    const events = this.props.appointments?.map((appointment) => ({
      title: `${appointment.patient?.firstName} ${appointment.patient?.lastName}`,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      extendedProps: {
        appointment,
      },
    }));

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

    const bookingTime = selectedDate ? selectedDate.toLocaleTimeString() : null;

    return (
      <PaperProvider theme={{ version: 2 }}>
        <Card style={styles.clinicHeader}>
          <Card.Title
            title={this.props.title + ": " + this.props.date.slice(0, 10)}
            titleVariant="titleLarge"
          />
          <Card.Actions>
            {this.props.handleCancel && (
              <Button
                icon="cancel"
                mode="outlined"
                onPress={this.props.handleCancel}
              >
                Cancel Clinic
              </Button>
            )}
          </Card.Actions>
          <Card.Content>
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
              eventBackgroundColor="white"
              eventTextColor="black"
              eventColor="black"
            />
          </Card.Content>
        </Card>
        <Portal>
          <Modal
            visible={showModalOne}
            onDismiss={() => this.setState({ showModalOne: false })}
            contentContainerStyle={containerStyle}
          >
            <View style={modalOneViewStyle}>
              <View style={styles.checkboxContainer}>
                <Text
                  variant="bodyLarge"
                  style={{ marginRight: 5, color: "black" }}
                >
                  Name:
                </Text>
                <Text variant="bodyLarge" style={{ color: "black" }}>
                  {appointment?.patient?.firstName}{" "}
                  {appointment?.patient?.lastName}
                </Text>
              </View>
              <Text variant="bodyLarge" style={{ color: "black" }}>
                Appointment Reason:
              </Text>
              <Text
                variant="bodyLarge"
                style={{
                  marginBottom: 30,
                  borderWidth: 1,
                  color: "black",
                  borderRadius: 5,
                }}
              >
                {appointment?.notes}
              </Text>
              {this.props.cancelAppointment && (
                <Button
                  mode="contained"
                  onPress={() =>
                    appointment && this.cancelAppointment!(appointment)
                  }
                >
                  Cancel Appointment
                </Button>
              )}
            </View>
          </Modal>
        </Portal>
        {this.props.createAppointment && (
          <Portal>
            <Modal
              visible={showModalTwo}
              onDismiss={() => this.setState({ showModalTwo: false })}
              contentContainerStyle={containerStyle}
            >
              <View style={modalTwoViewStyle}>
                <Text>Appointment Reason:</Text>
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
                  placeholder="Enter appointment reason here..."
                />
                <label>Enter Duration: </label>
                <Picker
                  style={{ marginBottom: 30 }}
                  selectedValue={this.state.selectedDuration}
                  onValueChange={(_, i) => this.onChangeSelectedDuration(i)}
                >
                  {durations.map((duration, index) => (
                    <Picker.Item
                      label={`${duration} minutes`}
                      value={index}
                      key={index}
                    />
                  ))}
                </Picker>
                <View style={styles.checkboxContainer}>
                  <label>Send patient SMS confirmation: </label>
                  <input
                    type="checkbox"
                    checked={this.state.smsConfirmed}
                    onChange={(e) =>
                      this.setState({ smsConfirmed: e.target.checked })
                    }
                  />
                </View>
                <Card style={styles.bookingContainer}>
                  <Card.Content>
                    Proceed to book appointment for: {bookingTime}
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() => this.setState({ showModalTwo: false })}
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={this.createAppointment}
                    >
                      Book
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            </Modal>
          </Portal>
        )}
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  clinicHeader: {
    color: "black",
    backgroundColor: "29335C",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  bookingContainer: {
    flexDirection: "row",
    backgroundColor: "white",
  },
});
