import { Router } from "express";

// import controllers
import {getAll, createCharacter, updateCharacter, delteCharacter, getOneCharacter} from '../controllers/characters.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/create', createCharacter);
router.put('/:id/edit', updateCharacter);
router.delete('/:id/delete', delteCharacter );
router.get('/:id', getOneCharacter );


export default router;