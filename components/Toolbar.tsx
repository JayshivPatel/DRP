import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Portal, Modal } from "react-native-paper";
import PatientSearch from "./PatientSearch";

import type { Patient } from "../lib/api";

type Props = {
  showSearchModal: () => void;
  hideSearchModal: () => void;
  createClinic: () => void;
  setPatient: (patient: Patient) => void;
  searchVisible: boolean;
};

export default class Toolbar extends React.Component<Props> {
  render() {
    return (
      <View style={styles.toolbarContainer}>
        <View style={styles.space} />
        <View style={styles.space} />
        <Button
          icon="magnify"
          mode="contained"
          dark={true}
          buttonColor="blue"
          onPress={this.props.showSearchModal}
        >
          Patient Search
        </Button>
        <Portal>
          <Modal
            visible={this.props.searchVisible}
            onDismiss={this.props.hideSearchModal}
            contentContainerStyle={styles.searchContainer}
          >
            <PatientSearch
              setPatient={(patient) => {
                this.props.hideSearchModal();
                this.props.setPatient(patient);
              }}
            />
          </Modal>
        </Portal>
        <View style={styles.space} />
        <Button
          icon="magnify"
          mode="contained"
          dark={true}
          buttonColor="blue"
          onPress={this.props.createClinic}
        >
          Create Clinic
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    alignSelf: "flex-start",
  },
  space: {
    width: 10,
    height: 20,
  },
});
