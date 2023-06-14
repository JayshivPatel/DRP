import { Card, PaperProvider } from "react-native-paper";
import renderNotifications from "./RenderNotifications";
import { ScrollView, StyleSheet } from "react-native";
import * as api from "../../lib/api";
import { Patient } from "../../lib/api";

export default function PatientMessages(props: { patientId: Patient["id"] }) {
  const { data, error, isLoading, mutate } = api.useNotifications();

  const notifications = renderNotifications(
    data,
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

