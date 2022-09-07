import { Router } from "express";

const router = Router();

// // import controllers
import {registerUser} from '../controllers/users.controllers.js';

// // register

router.post('/register', registerUser);

// login


export default router;