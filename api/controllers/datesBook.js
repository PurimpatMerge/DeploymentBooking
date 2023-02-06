import DatesBook from "../models/DatesBook.js";
// import Hotel from "../models/Hotel.js";

export const getDates = async (req, res, next) => {
  try {
    const events = await DatesBook.findOne({ pvid: req.params.id });
    if (!events) {
      return res.status(404).json({ message: "No events found for the given pvid" });
    }
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// export const updateDates = async (req, res, next) => {
//   try {
//     const dateBook = await DatesBook.findOne({ pvid: req.params.id });
//     if (!dateBook) {
//       return res.status(404).json({ message: "No dates found for the given pvid" });
//     }

//     const { title, start, end, price, color } = req.body;
//     const events = dateBook.events;
//     const index = events.findIndex(event => event.start === start && event.end === end);
//     if (index === -1) {
//       return res.status(404).json({ message: "No matching event found" });
//     }

//     events[index] = { title, start, end, price, color };
//     dateBook.events = events;
//     await dateBook.save();
//     res.json(dateBook);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const updateDates = async (req, res, next) => {
  try {
    let dateBook = await DatesBook.findOne({ pvid: req.params.id });
    if (!dateBook) {
      dateBook = new DatesBook({ pvid: req.params.id, events: [] });
    }

    const { title, start, end, price, color } = req.body;
    const events = dateBook.events;
    const index = events.findIndex(event => event.start === start && event.end === end);
    if (index === -1) {
      dateBook.events.push({ title, start, end, price, color });
    } else {
      events[index] = { title, start, end, price, color };
      dateBook.events = events;
    }
    await dateBook.save();
    res.json(dateBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// export const addDate = async (req, res, next) => {
//   try {
//     const date = req.body;
//     const events = await DatesBook.findOneAndUpdate(
//       { pvid: req.params.id },
//       { $push: { events: date } },
//       { new: true, useFindAndModify: false }
//     );
//     if (!events) {
//       return res.status(404).json({ message: "No events found for the given pvid" });
//     }
//     res.json(events);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


export const deleteDate = async (req, res, next) => {
  try {
    const events = await DatesBook.findOne({ pvid: req.params.id });
    if (!events) {
      return res.status(404).json({ message: "No events found for the given pvid" });
    }
    const start = req.body.start;
    const end = req.body.end;
    const eventToDelete = events.events.find(event => event.start === start && event.end === end);
    if (!eventToDelete) {
      return res.status(404).json({ message: "No event found for the given start and end date" });
    }
    events.events = events.events.filter(event => event.start !== start || event.end !== end);
    await events.save();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
