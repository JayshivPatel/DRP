import { FlatList, StyleSheet, Text, View } from "react-native";
import Clinic from "./components/Clinic";
import {
  PaperProvider,
  Button,
  Portal,
  Modal,
  Searchbar,
} from "react-native-paper";
import { SetStateAction, useState } from "react";
import MiniCalender from "./components/MiniCalender";
import Toolbar from "./components/Toolbar";
import PatientInfo from "./components/PatientInfo";

import type { Patient } from "./lib/api";

export default function App() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [clinicVisible, setClinicVisible] = useState(false);
  const [searchquery, setSearchquery] = useState("");
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

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
        setPatient={setPatient}
      />
      <View style={styles.container}>
        <View>
          <View>
            <PatientInfo patient={patient} />
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
