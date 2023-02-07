import React, { useState } from "react";
import { Calendar as AntCalendar, Popover } from "antd";
import moment from "moment";
import useFetch from "../../hooks/useFetch";

const EventDetails = ({ event }) => (
  <div>
    <h3>{event.title}</h3>
    <p>Start: {moment(event.start).format("MM/DD/YYYY")}</p>
    <p>End: {moment(event.end).format("MM/DD/YYYY")}</p>
    <p>Price : {event.price}</p>
  </div>
);

const MyCalendar = (props, id) => {
  const { startPrice, friPrice, satPrice, sunPrice, poolvilla } = props;
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

    let eventToShow = {};

    if (data && data.events) {
      for (let i = 0; i < events.length; i++) {
        let event = events[i];
        const start = moment(event.start);
        const end = moment(event.end) || start;
        const selectedDate = moment(value.toDate());

        if (selectedDate.isBetween(start, end, "day", "[]")) {
          if (event.title === "จอง" || !eventToShow.title) {
            eventToShow = event;
          }
        }
      }
    }

    if (eventToShow.title) {
      return (
        <Popover
          content={<EventDetails event={eventToShow} />}
          trigger="click"
          onOpenChange
        >
          <div style={{ background: `#${eventToShow.color}` }}>
            {eventToShow.title === "จอง"
              ? eventToShow.title
              : eventToShow.price}
          </div>
        </Popover>
      );
    }

    return (
      <div className="ant-calendar-date">
        {moment(value.toDate()).format("dddd") === "Friday" && friPrice
          ? friPrice
          : moment(value.toDate()).format("dddd") === "Saturday" && satPrice
          ? satPrice
          : moment(value.toDate()).format("dddd") === "Sunday" && sunPrice
          ? sunPrice
          : startPrice}
      </div>
    );
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
