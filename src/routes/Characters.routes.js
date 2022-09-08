import { Router } from "express";

// import controllers
import {getAll, createCharacter, updateCharacter} from '../controllers/characters.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/create', createCharacter);
router.put('/:id/edit', updateCharacter);


export default router;