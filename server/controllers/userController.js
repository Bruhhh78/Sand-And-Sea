import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

// Function to create a new user in the database
export const createUser = asyncHandler(async (req, res) => {
  // console.log("Creating a User...");

  let { email } = req.body;
  // console.log(email);
  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User created successfully",
      user: user,
    });
  } else {
    res.status(201).send({ message: "User already Registered" });
  }
});

// Function to book a visit to residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send({ message: "Your Visit is Booked Successfully" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// Function to get all the bookings
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.query; // Change req.body to req.query
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (!bookings) {
      return res.status(404).send({ message: "No bookings found for this user." });
    }

    res.status(200).send(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message); // Log the error for debugging
    return res.status(500).send({ message: "Internal server error." }); // Send a 500 response
  }
});


// Function to Cancel the bookings

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email: email },
        data: { bookedVisits: user.bookedVisits },
      });
      res.send("Booking Cancelled Successfully");
    }
  } catch (error) {
    throw new Error(err.message);
  }
});

//funtion to add a residency in the favourite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const removeUserFavResidency = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });
      res.send({
        message: "Removed from favorites",
        user: removeUserFavResidency,
      });
    } else {
      const newUpdateUserFavResidency = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({
        message: "Updated Favourite Residency",
        user: newUpdateUserFavResidency,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

//funtion to get all favourite list of a user

export const getAllFavourites = asyncHandler(async (req, res) => {
  const { email } = req.query; // Get email from query parameters
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" }); // Ensure email is present
    }

    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });

    if (!favResd) {
      return res.status(404).json({ message: "No favourites found for this user" });
    }

    res.status(200).json(favResd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

