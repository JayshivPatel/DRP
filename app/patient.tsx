import { BottomNavigation, PaperProvider } from "react-native-paper";
import PatientMessages from "../components/PatientMessages";
import PatientAppointments from "../components/PatientAppointments";
import PatientDashBoard from "../components/PatientDashboard";
import React from "react";

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
    { key: "appointments", title: "Appointments", focusedIcon: "history" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: PatientDashBoard,
    messages: PatientMessages,
    appointments: PatientAppointments,
  });

  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </PaperProvider>
  );
}
