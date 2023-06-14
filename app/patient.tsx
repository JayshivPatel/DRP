import { BottomNavigation, PaperProvider, Appbar } from "react-native-paper";
import PatientMessages from "../components/patient/PatientMessages";
import PatientAppointments from "../components/patient/PatientAppointments";
import PatientDashBoard from "../components/patient/PatientDashboard";
import React from "react";
import { useLocalSearchParams } from "expo-router";

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

  const renderScene = BottomNavigation.SceneMap({
    dashboard: () => PatientDashBoard({ patientId }),
    messages: () => PatientMessages({ patientId }),
    appointments: () => PatientAppointments({ patientId }),
  });

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Patient Applet" />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </PaperProvider>
  );
}
