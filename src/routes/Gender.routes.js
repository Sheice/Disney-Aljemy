import { Router } from "express";

// import controllers
import {
  createGender,
  deleteGender,
} from "../controllers/gender.controllers.js";

const router = Router();

router.post("/create", createGender);
router.delete("/:id/delete", deleteGender);

export default router;
