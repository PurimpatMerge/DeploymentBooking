import React, { useState } from "react";
import { Calendar as AntCalendar, Popover } from "antd";
import moment from "moment";
import useFetch from "../../hooks/useFetch";

const EventDetails = ({ event }) => (
  <div>
    <h3>{event.title}</h3>
    <p>Start: {moment(event.start).format("LLLL")}</p>
    <p>End: {moment(event.end).format("LLLL")}</p>
    <p>Price : {event.price}</p>
  </div>
);

const MyCalendar = (props, id) => {
  const { startPrice, poolvilla } = props;
  const { data, loading, error } = useFetch(`/datesBook/${poolvilla}`);

  const events = loading || error || !data ? [] : data.events;

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [month, setMonth] = useState(moment());

  const handleSelectEvent = (value) => {
    const selectedDate = moment(value.$d);
    const event = events.find((event) => {
      const start = moment(event.start);
      const end = moment(event.end) || start;
      return selectedDate.isBetween(start, end, "day", "[]");
    });
    setSelectedEvent(event);
  }; 
  const monthCellRender = (value) => {
    if (value.month() !== month.month()) {
      return <div />;
    }
  };

  const dateCellRender = (value) => {
    if (!value.isSame(month, "month")) {
      return <div />;
    }
  if (data && data.events) {
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      const start = moment(event.start);
      const end = moment(event.end) || start;
      const selectedDate = moment(value.toDate());

      if (selectedDate.isBetween(start, end, "day", "[]")) {
        return (
          <Popover
            content={<EventDetails event={event} />}
            trigger="click"
            onOpenChange
          >
            {event.title === "จอง" ? (
              <div style={{ background: `#${event.color}` }}>{event.title}</div>
            ) : (
              event.price
            )}
          </Popover>
        );
      } 
    }
}
    return <div> {startPrice} </div>;
 
 };
  return (
    <AntCalendar
      style={{ width: "450px", height: "350px" }}
      onChange={(value) => setMonth(value)}
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onSelect={handleSelectEvent}
    />
  );
};

export default MyCalendar;
