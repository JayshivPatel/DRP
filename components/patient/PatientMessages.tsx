import { Card, PaperProvider, Button } from "react-native-paper";
import renderNotifications from "./RenderNotifications";
import { ScrollView, StyleSheet } from "react-native";
import { usePatientFull } from "../../lib/api";
import { Patient } from "../../lib/api";

export default function PatientMessages(props: { patientId: Patient["id"] }) {
  const { data: patient, error, isLoading } = usePatientFull(props.patientId);

  const notifications = renderNotifications(
    patient?.notifications,
    error,
    isLoading,
    props.patientId
  );
  return (
    <PaperProvider>
      <ScrollView>
        <Card>
          <Card.Title title="Your Messages" titleVariant="displayMedium" />
          <Card.Content>
            <Card>
              <Card.Title title="Messages" titleVariant="headlineMedium" />
              <Card.Content>{notifications}</Card.Content>
            </Card>
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
});
