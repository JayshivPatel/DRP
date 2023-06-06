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
      <View style={styles.toolbarContainer}>
        <Button
          icon="magnify"
          mode="contained"
          dark={true}
          buttonColor="blue"
          onPress={showSearchModal}
        >
          Patient Search
        </Button>
        <Portal>
          <Modal
            visible={searchVisible}
            onDismiss={hideSearchModal}
            contentContainerStyle={styles.searchContainer}
          >
            <SearchBarList />
          </Modal>
        </Portal>
        <Button
          icon="magnify"
          mode="contained"
          dark={true}
          buttonColor="blue"
          onPress={showClinicModal}
        >
          Create Clinic
        </Button>
        <Portal>
          <Modal
            visible={clinicVisible}
            onDismiss={hideClinicModal}
            contentContainerStyle={styles.searchContainer}
          >
            <View>Placeholder text</View>
          </Modal>
        </Portal>
      </View>
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

  searchContainer: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    maxHeight: "50%",
    justifyContent: "center",
    alignSelf: "center",
  },
  toolbarContainer: {
    flexDirection: "row",
  },
});
