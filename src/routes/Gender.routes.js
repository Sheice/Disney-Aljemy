import { Router } from "express";

// import controllers
import {createGender} from '../controllers/gender.controllers.js'

const router = Router();

// router.get('/',);
router.post('/create', createGender);
// router.delete('/:id/delete', );
// router.get('/:id', );


export default router;