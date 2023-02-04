import DatesBook from "../models/DatesBook.js";
import Hotel from "../models/Hotel.js";

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