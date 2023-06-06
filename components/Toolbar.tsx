import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  PaperProvider,
  Button,
  Portal,
  Modal,
  Searchbar,
} from "react-native-paper";
import SearchBarList from "./SearchBarList";

type Props = {
  showSearchModal: () => void;
  hideSearchModal: () => void;
  showClinicModal: () => void;
  hideClinicModal: () => void;
  searchVisible: boolean;
  clinicVisible: boolean;
};

export default class Toolbar extends React.Component<Props> {
  render() {
    return (
      <View style={styles.toolbarContainer}>
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
            <SearchBarList />
          </Modal>
        </Portal>
        <Button
          icon="magnify"
          mode="contained"
          dark={true}
          buttonColor="blue"
          onPress={this.props.showClinicModal}
        >
          Create Clinic
        </Button>
        <Portal>
          <Modal
            visible={this.props.clinicVisible}
            onDismiss={this.props.hideClinicModal}
            contentContainerStyle={styles.searchContainer}
          >
            <View>Placeholder text</View>
          </Modal>
        </Portal>
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
  },
});
