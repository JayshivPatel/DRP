import React from "react";
import { View } from "react-native";
import FullCalendar from "@fullcalendar/react";
import { DateClickArg } from "@fullcalendar/interaction";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { PaperProvider } from "react-native-paper";

export default function MiniCalender(props: {
  changeDate: (date: string) => void;
}) {
  const [now, setNow] = React.useState(new Date());

  function changeDaySelected(payload: DateClickArg) {
    setNow(payload.date);
    props.changeDate(payload.dateStr);
  }

  return (
    <PaperProvider theme={{ version: 2 }}>
      {/* Workaround for https://github.com/fullcalendar/fullcalendar/issues/6322 */}
      <View key={now.toDateString()}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          now={now}
          nowIndicator={true}
          dateClick={changeDaySelected}
          contentHeight={400}
        />
      </View>
    </PaperProvider>
  );
}
