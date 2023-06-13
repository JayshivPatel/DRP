import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Chip,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import type { Patient } from "../../lib/api";
import PatientData from "./PatientData";

export default function PatientToolbar(props: {
  patient?: Patient;
  changePatient: () => void;
}) {
  const theme = useTheme();

  const fields = props.patient && [
    ["Name", `${props.patient.firstName} ${props.patient.lastName}`],
    ["Date of birth", new Date(props.patient.dateOfBirth).toLocaleDateString()],
    ["NHS Number", props.patient.nhsNumber],
    ["Phone Number", props.patient.phoneNumber],
  ];

  return (
    <Surface mode="flat" elevation={1} style={styles.surface}>
      <Text variant="labelLarge" style={styles.text}>
        Patient information
      </Text>
      {props.patient ? (
        <PatientData patient={props.patient}>
          {(name, value) => (
            <>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary }}
              >
                {name}
              </Text>
              <Text variant="labelLarge">{value}</Text>
            </>
          )}
        </PatientData>
      ) : (
        <Text
          variant="labelLarge"
          style={{
            color: theme.colors.secondary,
            ...styles.text,
          }}
        >
          No patient selected
        </Text>
      )}
      <Button mode="outlined" onPress={props.changePatient}>
        Change patient
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 8,
  },
});
