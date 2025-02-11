import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFavourites,
  toFav,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

// No jwtCheck on the registration route
router.post("/register", jwtCheck, createUser);
router.post("/bookvisit/:id", jwtCheck, bookVisit);
router.get("/allBookings", jwtCheck, getAllBookings);
router.post("/cancelbooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:rid", jwtCheck, toFav);
router.get("/allFavs", jwtCheck, getAllFavourites);

export { router as userRoute };