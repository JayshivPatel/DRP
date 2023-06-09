import { FlatList, StyleSheet, Text, View } from "react-native";
import ClinicInfo from "../components/receptionist/ClinicInfo";
import {
  PaperProvider,
  Button,
  Portal,
  Modal,
  Searchbar,
  Card,
} from "react-native-paper";
import { SetStateAction, useState } from "react";
import MiniCalender from "../components/receptionist/MiniCalender";
import Toolbar from "../components/receptionist/Toolbar";
import PatientInfo from "../components/receptionist/PatientInfo";

import { Patient, createClinic, useClinics } from "../lib/api";
import type { Clinic } from "../lib/api";
const today = new Date().toISOString().split("T")[0];

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
    <PaperProvider theme={{ version: 2 }}>
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
          <Card style={styles.calendarContainer}>
            <Card.Content>
              <MiniCalender changeDate={updateDate} />
            </Card.Content>
          </Card>
        </View>
        <View style={styles.clinicContainer}>
          {clinics?.map((clinic) => (
            <View style={styles.clinicInfo}>
              <ClinicInfo
                clinic={clinic}
                selectedPatient={patient}
                onDelete={mutateClinics}
              />
            </View>
          ))}
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
    backgroundColor: "white",
  },

  clinicContainer: {
    flexDirection: "row",
    marginLeft: 10,
    flex: 1,
  },
  clinicInfo: {
    flexGrow: 1,
    flexShrink: 1,
    flex: 1,
  },
  patientContainer: {
    backgroundColor: "white",
  },
});
