import { Router } from "express";

// import controllers
import {getAll, createCharacter} from '../controllers/characters.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/create', createCharacter);


export default router;