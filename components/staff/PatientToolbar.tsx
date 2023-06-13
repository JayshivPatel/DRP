import * as React from "react";
import { Button, Chip, Surface, Text, useTheme } from "react-native-paper";

import type { Patient } from "../../lib/api";
import PatientData from "./PatientData";
import Toolbar from "./Toolbar";

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
    <Toolbar>
      <Toolbar.Text>Patient information</Toolbar.Text>
      {props.patient ? (
        <PatientData patient={props.patient}>
          {(name, value) => (
            <>
              <Toolbar.Text style={{ color: theme.colors.primary }}>
                {name}
              </Toolbar.Text>
              <Toolbar.Text>{value}</Toolbar.Text>
            </>
          )}
        </PatientData>
      ) : (
        <Toolbar.Text style={{ color: theme.colors.secondary }}>
          No patient selected
        </Toolbar.Text>
      )}
      <Button
        mode="outlined"
        icon="account-box-multiple"
        onPress={props.changePatient}
      >
        Change patient
      </Button>
      <Button mode="outlined" icon="account-clock">
        Change suggested length
      </Button>

      <Chip mode="outlined" icon="clock">
        Suggested appointment length: 15 mins
      </Chip>
    </Toolbar>
  );
}
