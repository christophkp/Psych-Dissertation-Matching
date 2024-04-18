import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const localizer = momentLocalizer(moment);

export const MySchedule = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/meetings", { withCredentials: true })
      .then((response) => {
        const meetings = response.data;
        const formattedEvents = meetings.map((meeting) => ({
          title: "Faculty Meeting",
          start: new Date(meeting.startDate),
          end: new Date(meeting.endDate),
        }));
        setEvents(formattedEvents);
      })

      .catch((err) => {
        console.log("ERROR");
      });
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 650, fontSize: "15px" }}
      />
    </div>
  );
};
