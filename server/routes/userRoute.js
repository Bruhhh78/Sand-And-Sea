import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFavourites,
  toFav,
} from "../controllers/userController.js";

const router = express.Router();

// No jwtCheck on the registration route
router.post("/register",createUser);
router.post("/bookvisit/:id", bookVisit);
router.get("/allbookings", getAllBookings);
router.post("/cancelbooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.get("/allFavs/", getAllFavourites);

export { router as userRoute };
