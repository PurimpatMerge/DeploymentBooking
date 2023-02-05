import React, { useState } from "react";
import {
  Calendar as AntCalendar,
  Popover,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import moment from "moment";
import useFetch from "../../hooks/useFetch";

const { Option } = Select;

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
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...editingEvent,
      ...prev,
      [e.target.id]: e.target.value,
    }));
    console.log(info);
  };
  const handleEditEvent = () => {
    // setInfo({ start: formattedDate, end: formattedDate });
    setIsEditing(true);
    setEditingEvent(selectedEvent);
  };

  const handleNewEvent = (formattedDate) => {
    // setInfo({ start: formattedDate, end: formattedDate });
    setIsEditing(true);
    setEditingEvent({
      start: formattedDate,
      end: formattedDate,
      title: "",
      price: "",
      color: "",
    });
  };

  const handleSelectEvent = (value) => {
    const selectedDate = moment(value.$d);
    const event = events.find((event) => {
      const start = moment(event.start);
      const end = moment(event.end) || start;
      return selectedDate.isBetween(start, end, "day", "[]");
    });
    setSelectedEvent(event);
  };
  const handleModalOk = () => {
    if (!info.title || !info.price || !info.start || !info.end) {
      return alert("Make sure your edit and all fill have change");
    }
    console.log(info);
    // update event here
    // ...
    setIsEditing(false);
    setEditingEvent(null);
    setInfo({});
  };

  const handleModalCancel = () => {
    setIsEditing(false);
    setEditingEvent(null);
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
              content={
                <div>
                  <EventDetails event={event} />
                  <button onClick={handleEditEvent}>Edit</button>
                </div>
              }
            >
              {event.title === "จอง" ? (
                <div style={{ background: `#${event.color}` }}>
                  {event.title}
                </div>
              ) : (
                event.price
              )}
            </Popover>
          );
        }
      }
    }
    return (
      <div className="ant-calendar-date">
        {/* {value.format("MM/DD/YYYY")} */}
        <button onClick={() => handleNewEvent(value.format("MM/DD/YYYY"))}>
          Edit
        </button>
      </div>
    );
  };

  return (
    <div>
      <AntCalendar
        // style={{ width: "450px", height: "350px" }}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={handleSelectEvent}
        onPanelChange={(value) => setMonth(value)}
      />
      {isEditing && (
        <Modal
          title="Edit Event"
          open={isEditing}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form>
            <label>Type</label>
            <select
              id={"color"}
              onChange={handleChange}
              defaultValue={editingEvent ? editingEvent.color : ""}
            >
              <option value="ffffff">ว่าง </option>
              <option value="ff0000">จอง </option>
              <option value="FFFF00">ราคาวันห</option>
              <option value="A020F0">ลดพิเศษ </option>
            </select>
            <label>Tiltle</label>
            <Input
              id={"title"}
              defaultValue={editingEvent ? editingEvent.title : ""}
              onChange={handleChange}
            />
            <label>Price</label>
            <Input
              id={"price"}
              defaultValue={editingEvent ? editingEvent.price : ""}
              onChange={handleChange}
            />
            <Form.Item label="Start">
              <Input
                id="start"
                defaultValue={moment(editingEvent.start).format("MM/DD/YYYY")}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="End">
              <Input
                id="end"
                defaultValue={moment(editingEvent.end).format("MM/DD/YYYY")}
                onChange={handleChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default MyCalendar;
