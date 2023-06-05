import { FlatList, StyleSheet, Text, View } from "react-native";
import Clinic from "./components/Clinic";
import { PaperProvider, Button, Portal, Modal, Searchbar } from "react-native-paper";
import { Calendar as FullCalendar } from "react-native-calendars";
import Patient from "./components/Patient";
import { SetStateAction, useState } from "react";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [searchquery, setSearchquery] = useState('');

  const onChangeSearch = (query: SetStateAction<string>) => setSearchquery(query);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <PaperProvider>
      <Button icon="magnify" mode="contained" onPress={() => setVisible(true)}>
        Patient Search
      </Button>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.searchContainer}
        >
          <View>
            <Searchbar
              placeholder="Search"
              value={searchquery}
              onChangeText={onChangeSearch}
            />
          </View>
        </Modal>
      </Portal>
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
});
