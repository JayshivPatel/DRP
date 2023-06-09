import React from "react";
import Schedule from "./Schedule";
import {
  Clinic,
  Patient,
  Appointment,
  deleteClinic,
  createAppointment,
  useAppointments,
  deleteAppointment,
} from "../../lib/api";
import { View, Text, StyleSheet } from "react-native";

export default function ClinicInfo({
  clinic,
  selectedPatient,
  onDelete,
}: {
  clinic: Clinic;
  selectedPatient?: Patient;
  onDelete?: () => void;
}) {
  const { data, mutate } = useAppointments({
    clinicId: clinic.id,
    includePatient: true,
  });

  return (
    <Schedule
      title={clinic.title}
      date={clinic.date}
      appointments={data}
      handleCancel={async () => {
        if (!confirm("Are you sure you wish to cancel this clinic?")) {
          return;
        }
        await deleteClinic(clinic.id);
        onDelete!();
      }}
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
      cancelAppointment={async ({ id }) => {
        await deleteAppointment(id);
        mutate();
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
  },
});
