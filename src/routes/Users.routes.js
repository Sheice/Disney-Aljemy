import { Router } from "express";

const router = Router();

// // import controllers
import {registerUser, loginUser} from '../controllers/users.controllers.js';

// // register

router.post('/register', registerUser);

router.post('/login', loginUser);

// login


export default router;