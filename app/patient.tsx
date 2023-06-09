import { BottomNavigation, PaperProvider, Appbar } from "react-native-paper";
import PatientMessages from "../components/patient/PatientMessages";
import PatientAppointments from "../components/patient/PatientAppointments";
import PatientDashBoard from "../components/patient/PatientDashboard";
import React from "react";
import { View } from "react-native";

export default function PatientApp() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "dashboard",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    { key: "messages", title: "Messages", focusedIcon: "email" },
    { key: "appointments", title: "Appointments", focusedIcon: "calendar" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: PatientDashBoard,
    messages: PatientMessages,
    appointments: PatientAppointments,
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
