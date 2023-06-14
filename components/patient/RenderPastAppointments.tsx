import { View } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import { Patient } from "../../lib/api";
import PatientAppointment from "./PatientAppointment";
import { sortAppointments } from "./SortAppointments";

const renderPastAppointments = function (
  data: any,
  error: Error | undefined,
  isLoading: boolean,
  patientId: Patient["id"]
) {
  if (error || isLoading) {
    return (
      <View>
        <Text>{error ? "Failed to load" : "Loading"}</Text>
      </View>
    );
  }
  return (
    <Card>
      <Card.Content>
        {sortAppointments(data, true)
          ?.filter((app) => {
            const currentDate = new Date();
            const appDate = new Date(app.clinic?.date ? app.clinic?.date : 0);

            const [hrs, mins] = app.startTime.split(":").map(Number);
            appDate.setHours(hrs);
            appDate.setMinutes(mins);

            return appDate.getTime() < currentDate.getTime();
          })
          .map((app) => (
            <>
              <PatientAppointment {...app} />
              <Divider />
            </>
          ))}
      </Card.Content>
    </Card>
  );
};

export default renderPastAppointments;
