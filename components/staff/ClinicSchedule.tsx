import * as React from "react";
import { StyleSheet } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";

import FullCalendar from "@fullcalendar/react";

import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { Appointment, Clinic, useAppointments } from "../../lib/api";
import styled from "@emotion/styled";
import { EventClickArg, EventInput } from "@fullcalendar/core";

const CalendarWrapper = styled.div<{ theme: MD3Theme }>(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  color: theme.colors.onSurface,

  fontFamily: theme.fonts.bodyMedium.fontFamily,
  fontSize: theme.fonts.bodyLarge.fontSize + "px",
  fontStyle: theme.fonts.bodyMedium.fontStyle,
  fontWeight: theme.fonts.bodyMedium.fontWeight,

  ["--fc-small-font-size"]: "auto",
  ["--fc-event-bg-color"]: theme.colors.tertiary,
  ["--fc-event-text-color"]: theme.colors.onTertiary,
  ["--fc-highlight-color"]: theme.colors.tertiaryContainer,
  ["--fc-today-bg-color"]: "auto",
  ["--fc-now-indicator-color"]: "red",
}));

export default function ClinicSchedule(props: {
  appointments: Appointment[] | undefined;
  selectionStart?: Date;
  selectionEnd?: Date;
  onPressDate: (date: Date, x: number, y: number) => void;
  onPressEvent: (appointment: Appointment, x: number, y: number) => void;
}) {
  const calendarRef = React.useRef<FullCalendar>(null);
  const theme = useTheme();

  React.useEffect(() => {
    const calendar = calendarRef.current;
    if (!calendar) {
      return;
    }

    if (props.selectionStart) {
      calendar.getApi().select(props.selectionStart, props.selectionEnd);
    } else {
      calendar.getApi().unselect();
    }
  }, [calendarRef.current, props.selectionStart, props.selectionEnd]);

  const events = React.useMemo(
    () =>
      props.appointments?.map((appointment) => {
        const patient = appointment.patient!;
        const fullName = `${patient.firstName} ${patient.lastName}`;
        const dateOfBirth = new Date(patient.dateOfBirth).toLocaleDateString();
        const isSeen = appointment.status == "SEEN";
        const seenPrefix = isSeen ? "✅ " : "";

        const event: EventInput = {
          title: `${seenPrefix}${fullName} - ${dateOfBirth}\n${appointment.notes}`,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          backgroundColor: isSeen
            ? theme.colors.tertiaryContainer
            : theme.colors.tertiary,
          textColor: isSeen
            ? theme.colors.onTertiaryContainer
            : theme.colors.onTertiary,
          extendedProps: { appointment },
        };

        return event;
      }),
    [theme, props.appointments]
  );

  function dateClick({ date, jsEvent }: DateClickArg) {
    props.onPressDate(date, jsEvent.pageX, jsEvent.pageY);
  }

  function eventClick({ event, jsEvent }: EventClickArg) {
    const { appointment } = event.extendedProps;
    props.onPressEvent(appointment, jsEvent.pageX, jsEvent.pageY);
  }

  return (
    <CalendarWrapper theme={theme}>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        height="auto"
        headerToolbar={false}
        allDaySlot={false}
        dayHeaders={false}
        nowIndicator={true}
        events={events}
        slotMinTime="08:00:00"
        slotMaxTime="19:00:00"
        slotDuration="00:05:00"
        dateClick={dateClick}
        eventClick={eventClick}
        unselectAuto={false}
      />
    </CalendarWrapper>
  );
}

const styles = StyleSheet.create({});
