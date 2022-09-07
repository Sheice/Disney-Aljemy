import { Router } from "express";

// import controllers
import {getAll} from '../controllers/characters.controller.js';

const router = Router();

router.get('/', getAll);


export default router;