import { Router } from "express";

// import controllers
import {getAll, createMovie, updateMovie} from '../controllers/movies.controllers.js';

const router = Router();

router.get('/', getAll);
router.post('/create', createMovie);
router.put('/:id/edit', updateMovie);
router.delete('/:id/delete', updateMovie);
router.get('/:id');


export default router;