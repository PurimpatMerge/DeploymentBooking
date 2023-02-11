import DatesBook from "../models/DatesBook.js";
// import Hotel from "../models/Hotel.js";
import moment from "moment";

export const getDates = async (req, res, next) => {
  try {
    const events = await DatesBook.findOne({ pvid: req.params.id });
    if (!events) {
      return res
        .status(404)
        .json({ message: "No events found for the given pvid" });
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
    const index = events.findIndex(
      (event) => event.start === start && event.end === end
    );
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
      return res
        .status(404)
        .json({ message: "No events found for the given pvid" });
    }
    const start = req.body.start;
    const end = req.body.end;
    const eventToDelete = events.events.find(
      (event) => event.start === start && event.end === end
    );
    if (!eventToDelete) {
      return res
        .status(404)
        .json({ message: "No event found for the given start and end date" });
    }
    events.events = events.events.filter(
      (event) => event.start !== start || event.end !== end
    );
    await events.save();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const findPrice = async (req, res, next) => {
//   try {
//     const userStartDate = "02/17/2023";
//     const userEndDate = "02/20/2023";
//     const startPrice = 4900;
//     const friPrice = 5900;
//     const satPrice = 6900;
//     const sunPrice = 4900;
//     // const poolvilla = "63b861256a0f8404c4081af5";
//     const dates = await DatesBook.findOne({ pvid: req.params.id });
//     if (!dates) {
//       return res
//         .status(404)
//         .json({ message: "No events found for the given poolvilla id" });
//     }

//     let totalPrice = 0;
//     for (
//       let date = moment(userStartDate, "MM/DD/YYYY");
//       date.isBefore(userEndDate, "MM/DD/YYYY");
//       date.add(1, "day")
//     ) {
//       const day = date.format("MM/DD/YYYY");
//       let price;
//       for (let i = 0; i < dates.events.length; i++) {

//   if (day >= dates.events[i].start && day <= dates.events[i].end) {
//     if (dates.events[i].title === "จอง") {
//       price = 0;
//       break;
//       } else{

//         price = dates.events[i].price;
//         break;
//       }
//         }
//       }

//       const dayOfWeek = date.day();
//       if (price === undefined) {
//         if (dayOfWeek === 5) {
//           price = friPrice;
//         } else if (dayOfWeek === 6) {
//           price = satPrice;
//         } else if (dayOfWeek === 0) {
//           price = sunPrice;
//         } else {
//           price = startPrice;
//         }
//       }
//       totalPrice += price;
//     }
//     res.json({ totalPrice });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const findPrice = async (req, res, next) => {
  try {
    const {userStartDate,userEndDate,startPrice, friPrice, satPrice, sunPrice} = req.params;
    const dates = await DatesBook.findOne({ pvid: req.params.id });
    if (!dates) {
      return res
        .status(404)
        .json({ message: "No events found for the given poolvilla id" });
    }

    let priceGeter = [];
    for (
      let date = moment(userStartDate, "MM/DD/YYYY");
      !date.isAfter(moment(userEndDate, "MM/DD/YYYY"));
      date.add(1, "day")
    ) {
      const day = date.format("MM/DD/YYYY");
      let price;

      for (let i = 0; i < dates.events.length; i++) {
        if (day >= dates.events[i].start && day <= dates.events[i].end) {
          if (dates.events[i].title) {
            price = parseInt(dates.events[i].price);
            priceGeter.push({ day, price });
            break;
          }
        }
      }

      const dayOfWeek = date.day();
      if (price === undefined) {
        if (dayOfWeek === 5) {
          price = friPrice;

          priceGeter.push({ day, price });
        } else if (dayOfWeek === 6) {
          price = satPrice;

          priceGeter.push({ day, price });
        } else if (dayOfWeek === 0) {
          price = sunPrice;

          priceGeter.push({ day, price });
        } else {
          price = startPrice;

          priceGeter.push({ day, price });
        }
      }

    }

    const bookings = dates.events.filter((event) => event.title === "จอง");
    priceGeter.forEach((priceItem) => {
      bookings.forEach((booking) => {
        if (priceItem.day === booking.start) {
          priceItem.price = 0;
        }
      });
    });

    // console.log(priceGeter);
    let totalPrice = priceGeter.reduce((sum, { price }) => sum + parseInt(price, 10), 0);
    let datesBook = priceGeter.filter(({ price }) => price !== 0);
    res.json({ totalPrice ,datesBook});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
