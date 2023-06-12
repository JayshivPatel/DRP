import { Card, PaperProvider, Divider, Text, List } from "react-native-paper";
import { FlatList, View } from "react-native";
import Appointment from "./PatientAppointment";
import Message from "./PatientMessage";
import { ScrollView } from "react-native";
import * as api from "../../lib/api";

export default function PatientDashboard() {
  const temporaryAppointments = [
    {
      startTime: "9:00",
      endTime: "9:10",
      notes: "This is a test",
      id: 10,
      clinic: {
        id: 1,
        title: "Dr Beans",
        date: "12-06-23",
      },
    },
  ];

  const { data, error, isLoading, mutate } = api.useNotifications();

  const notifications = (function () {
    if (error || isLoading) {
      return (
        <View>
          <Text>{error ? "Failed to load" : "Loading"}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <List.Item
            title={"Message"}
            description={item}
            left={(props) => <List.Icon {...props} icon="email" />}
          />
        )}
      />
    );
  })();

  return (
    <PaperProvider>
      <ScrollView>
        <Card>
          <Card.Title title="Dashboard" titleVariant="displayMedium" />
          <Card.Content>
            <Card>
              <Card.Title
                title="Upcoming Appointments:"
                titleVariant="headlineMedium"
              />
              <Card.Content>
                <FlatList
                  data={temporaryAppointments}
                  renderItem={({ item }) => (
                    <List.Item
                      title={item.clinic.date}
                      description={
                        "Seeing:  " +
                        item.clinic.title +
                        "\n" +
                        "Reason: " +
                        item.notes
                      }
                      left={(props) => <List.Icon {...props} icon="calendar" />}
                    />
                  )}
                />
              </Card.Content>
            </Card>
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
