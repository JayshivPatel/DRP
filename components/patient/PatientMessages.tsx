import { Card, PaperProvider, DefaultTheme } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import { usePatientFull } from "../../lib/api";
import { Patient } from "../../lib/api";
import materialColors from "../../material-colors.json";
import PatientNotifications from "./PatientNotifications";

export default function PatientMessages(props: { patientId: Patient["id"] }) {
  const {
    data: patient,
    error,
    isLoading,
    mutate,
  } = usePatientFull(props.patientId);

  return (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        colors: materialColors.colors,
      }}
    >
      <ScrollView>
        <Card style={styles.cards}>
          <Card.Title
            title="Your Messages"
            titleVariant="headlineMedium"
            titleNumberOfLines={5}
          />
          <Card.Content>
            <PatientNotifications
              notifications={patient?.notifications}
              error={error}
              isLoading={isLoading}
              mutate={mutate}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  messagebuttons: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  cards: {
    margin: 30,
  },
});
