import React from "react";
import { Calendar as FullCalendar } from "react-native-calendars";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";


export default class MiniCalender extends React.Component {
    changeDaySelected = (payload: DateClickArg) => {
        alert("This should change the day" + payload.date)
    }
    render() {


        return (
            <FullCalendar
              nowIndicator = {true}
              dateClick = {this.changeDaySelected}
            />
        )
    }
}