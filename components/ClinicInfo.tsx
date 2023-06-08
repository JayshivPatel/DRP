import React from "react";
import Schedule from "./Schedule";
import {
  Clinic,
  Patient,
  Appointment,
  createAppointment,
  useAppointments,
} from "../lib/api";
import { View, Text, StyleSheet } from "react-native";

export default function ClinicInfo({
  clinic,
  selectedPatient,
}: {
  clinic: Clinic;
  selectedPatient?: Patient;
}) {
  const { data, mutate } = useAppointments({
    clinicId: clinic.id,
    includePatient: true,
  });

  return (
    <Schedule
      title={clinic.title}
      date={clinic.date}
      appointments={data?.map((appointment: Appointment) => ({
        ...appointment,
        title: `${appointment.patient?.firstName} ${appointment.patient?.lastName}`,
      }))}
      createAppointment={
        selectedPatient &&
        (async (startTime, endTime, notes, notifySms) => {
          await createAppointment({
            patientId: selectedPatient.id,
            clinicId: clinic.id,
            startTime,
            endTime,
            notes,
            notifySms,
          });
          mutate();
        })
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
  },
});
