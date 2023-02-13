import Booking from "../models/Booking.js";
import DatesBook from "../models/DatesBook.js";
import jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import express from "express";

export const bookingUser = async (req, res) => {
  try {
    const bookingData = new Booking(req.body);
    let dateBook = await DatesBook.findOne({ pvid: req.body.poolvillaId });
    if (!dateBook) {
      dateBook = new DatesBook({ pvid: req.body.poolvillaId, events: [] });
    }
    for (const date of req.body.bookingDates) {
      const { day, price } = date;
      const title = "จอง";
      const start = day;
      const end = day;
      const color = "ff0000";
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
    }
    const savedBookingDataBooked = await dateBook.save();
    const savedBookingData = await bookingData.save();
    res.status(200).json({
      success: true,
      data: savedBookingData,
      dataBooked: savedBookingDataBooked,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const GetbookingUser = async (req, res, next) => {
  try {
    const bookingData = await Booking.find();
    if (!bookingData) {
      return res.status(404).json({
        success: false,
        error: "No booking data found",
      });
    }
    res.status(200).json(bookingData);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const Reject = async (req, res, next) => {
  try {
    const bookingData = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: { statusBooking: "reject" },
      },
      {
        new: true,
      }
    );
    console.log(bookingData.poolvillaId);
    //
    let dateBook = await DatesBook.findOne({ pvid: bookingData.poolvillaId });
    if (!dateBook) {
      dateBook = new DatesBook({ pvid: bookingData.poolvillaId, events: [] });
    }
    for (const date of bookingData.bookingDates) {
      const { day, price } = date;
      const title = "ว่าง";
      const start = day;
      const end = day;
      const color = "ffffff";
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
    }
    const savedBookingDataBooked = await dateBook.save();

    res.status(200).json({
      success: true,
      data: bookingData,
      dataReject: savedBookingDataBooked,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const Approve = async (req, res, next) => {
  try {
    const bookingData = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: { statusBooking: "Approve" },
      },
      {
        new: true,
      }
    );
    let dateBook = await DatesBook.findOne({ pvid: bookingData.poolvillaId });
    if (!dateBook) {
      dateBook = new DatesBook({ pvid: bookingData.poolvillaId, events: [] });
    }
    for (const date of bookingData.bookingDates) {
      const { day, price } = date;
      const title = "จอง";
      const start = day;
      const end = day;
      const color = "ff0000";
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
    }
    const savedBookingDataBooked = await dateBook.save();
    // send email

    console.log(bookingData.bookingDates);
    console.log(bookingData.bookingTotalPrice);

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "mergeofficial@hotmail.com",
        pass: "qgsfqivlbbsovqhu",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "mergeofficial@hotmail.com",
      to: bookingData.email,
      subject: "Booking with Merge Poolvilla ",
      text: `ยืนยันการจอง ${bookingData.poolvillaName} ในวันที่:
    
    ${bookingData.bookingDates.map((event) => `${event.day} : ฿${event.price}`).join("\n")}
    
    รวมทั้งหมด: ฿${bookingData.bookingTotalPrice}
    
    ขอบคุณที่ทำการจองกับ Merge Poolvilla`,
    };
    

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({
      success: true,
      data: bookingData,
      dataReject: savedBookingDataBooked,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const MyBooking = async (req, res, next) => {
  try {
    const bookingDataByUsername = await Booking.find({
      username: req.params.username,
    });

    let bookingData;
    if (bookingDataByUsername.length > 0) {
      bookingData = bookingDataByUsername;
    } else {
      bookingData = await Booking.find({ email: req.params.email });
    }
    console.log(bookingData);
    res.status(200).json(bookingData);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
