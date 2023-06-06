import { FlatList, StyleSheet, Text, View } from "react-native";
import Clinic from "./components/Clinic";
import { PaperProvider } from "react-native-paper";
import { Calendar } from "@fullcalendar/core";
import { Calendar as FullCalendar } from "react-native-calendars";
import Patient from "./components/Patient";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View>
          <View>
            <Patient
              name="Test Name"
              dob="01/02/1234"
              address="Test Address"
              phone="0123456789"
              nhsNum="0000000000"
              flags="Test Flags"
              avgTime="15"
            />
          </View>
          <View style={styles.calendarContainer}>
            <FullCalendar />
          </View>
        </View>
        <View style={styles.clinicContainer}>
          <Clinic></Clinic>
          <Clinic></Clinic>
          <Clinic></Clinic>
          <Clinic></Clinic>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
  },

  calendarContainer: {
    marginRight: 15,
    flex: 1,
  },

  clinicContainer: {
    flexDirection: "row",
    marginLeft: 10,
    flex: 3,
  },
});
