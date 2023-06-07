import { FlatList, StyleSheet, Text, View } from "react-native";
import ClinicInfo from "../components/ClinicInfo";
import {
  PaperProvider,
  Button,
  Portal,
  Modal,
  Searchbar,
} from "react-native-paper";
import { SetStateAction, useState } from "react";
import MiniCalender from "../components/MiniCalender";
import Toolbar from "../components/Toolbar";
import PatientInfo from "../components/PatientInfo";

import { Patient, createClinic, useClinics } from "../lib/api";
import type { Clinic } from "../lib/api";
const today = ((new Date()).toISOString().split('T')[0]);

export default function Receptionist() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [clinicVisible, setClinicVisible] = useState(false);
  const [searchquery, setSearchquery] = useState("");
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [date, setDate] = useState(today);

  const onChangeSearch = (query: SetStateAction<string>) =>
    setSearchquery(query);
  const showSearchModal = () => setSearchVisible(true);
  const hideSearchModal = () => setSearchVisible(false);

  const { data: clinics, mutate: mutateClinics } = useClinics({
    date: date,
  });

  function updateDate(date: string) {
    setDate(date);
  }

  return (
    <PaperProvider>
      <Toolbar
        showSearchModal={showSearchModal}
        hideSearchModal={hideSearchModal}
        createClinic={async () => {
          const title = prompt("Clinic name");
          if (!title) {
            return;
          }

          await createClinic(date, title);
          mutateClinics();
        }}
        searchVisible={searchVisible}
        setPatient={setPatient}
      />
      <View style={styles.container}>
        <View>
          <View>
            <PatientInfo patient={patient} />
          </View>
          <View style={styles.calendarContainer}>
            <MiniCalender changeDate={updateDate} />
          </View>
        </View>
        <View style={styles.clinicContainer}>
          <FlatList
            data={clinics}
            horizontal={true}
            renderItem={(clinic) => <ClinicInfo clinic={clinic.item} />}
          />
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
