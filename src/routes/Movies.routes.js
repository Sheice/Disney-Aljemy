import { Router } from "express";

// import controllers
import {getAll, createMovie} from '../controllers/movies.controllers.js';

const router = Router();

router.get('/', getAll);
router.post('/create', createMovie);
router.put('/:id/edit');
router.delete('/:id/delete');
router.get('/:id');


export default router;