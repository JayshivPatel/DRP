import { FlatList, StyleSheet, Text, View } from "react-native";
import Clinic from "./components/Clinic";
import {
  PaperProvider,
  Button,
  Portal,
  Modal,
  Searchbar,
} from "react-native-paper";
import { Calendar as FullCalendar } from "react-native-calendars";
import Patient from "./components/Patient";
import { SetStateAction, useState } from "react";
import MiniCalender from "./components/MiniCalender";
import SearchBarList from "./components/SearchBarList";
import Toolbar from "./components/Toolbar";

export default function App() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [clinicVisible, setClinicVisible] = useState(false);
  const [searchquery, setSearchquery] = useState("");

  const onChangeSearch = (query: SetStateAction<string>) =>
    setSearchquery(query);
  const showSearchModal = () => setSearchVisible(true);
  const hideSearchModal = () => setSearchVisible(false);
  const showClinicModal = () => setClinicVisible(true);
  const hideClinicModal = () => setClinicVisible(false);
  return (
    <PaperProvider>
      <Toolbar
        showSearchModal={showSearchModal}
        hideSearchModal={hideSearchModal}
        showClinicModal={showClinicModal}
        hideClinicModal={hideClinicModal}
        searchVisible={searchVisible}
        clinicVisible={clinicVisible}
      />
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
            <MiniCalender />
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
