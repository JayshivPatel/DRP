import {
  BottomNavigation,
  PaperProvider,
  Appbar,
  DefaultTheme,
  Text,
} from "react-native-paper";
import PatientMessages from "../components/patient/PatientMessages";
import PatientAppointments from "../components/patient/PatientAppointments";
import PatientDashBoard from "../components/patient/PatientDashboard";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import materialColors from "../material-colors.json";
import { usePatientFull } from "../lib/api";
import { View } from "react-native";
import Config from "../components/Config";

const routes = [
  {
    key: "dashboard",
    title: "Home",
    focusedIcon: "home",
    unfocusedIcon: "home-outline",
  },
  {
    key: "messages",
    title: "Messages",
    focusedIcon: "android-messages",
  },
  {
    key: "appointments",
    title: "Appointments",
    focusedIcon: "calendar",
  },
];

function useParams(...keys: string[]): (string | undefined)[] {
  const params = useLocalSearchParams();
  return keys
    .map((key) => params[key])
    .map((value) =>
      typeof value === "object" ? value[value.length - 1] : value
    );
}

export default function PatientApp() {
  const [idStr] = useParams("id");
  const [index, setIndex] = React.useState(0);

  const patientId = parseInt(idStr ?? "");

  const { data: patient, error, isLoading, mutate } = usePatientFull(patientId);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: () => PatientDashBoard({ patientId }),
    messages: () => PatientMessages({ patientId }),
    appointments: () => PatientAppointments({ patientId }),
  });

  const name = () => {
    if (error || isLoading) {
      return error ? "Failed to load" : "Loading";
    }
    return "Welcome " + patient?.firstName + " " + patient?.lastName;
  };

  return (
    <Config>
      <PaperProvider
        theme={{
          ...DefaultTheme,
          colors: materialColors.colors,
        }}
      >
        <Appbar.Header>
          <Appbar.Content title={name()} />
        </Appbar.Header>
        <BottomNavigation
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
      </PaperProvider>
    </Config>
  );
}
