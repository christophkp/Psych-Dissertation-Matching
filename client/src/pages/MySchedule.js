import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const localizer = momentLocalizer(moment);

export const MySchedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();

  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/meetings", { withCredentials: true })
      .then((response) => {
        const meetings = response.data;
        const formattedEvents = meetings.map((meeting) => ({
          id: meeting.id,
          title: "Meet with Faculty",
          start: new Date(meeting.startDate),
          end: new Date(meeting.endDate),
          desc: "Test description",
        }));
        setEvents(formattedEvents);
      })

      .catch((err) => {
        console.log("ERROR");
      });
  }, []);

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
    handleShow();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 650, fontSize: "15px" }}
        onSelectEvent={handleSelectedEvent}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <p className="mt-3" style={{ marginLeft: "20px" }}>
          Start: {moment(selectedEvent?.start).format("LLL")}
        </p>
        <p className="mt-2" style={{ marginLeft: "20px" }}>
          End: {moment(selectedEvent?.end).format("LLL")}
        </p>
        <p className="mt-2" style={{ marginLeft: "20px" }}>
          Meeting Details: {selectedEvent?.desc}
        </p>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
