import {Character} from '../models/Characters.js';
import {destroyImage, uploadImage} from '../utils/cloudinary.js';
import {MovieOrSerie} from '../models/MovierOrSerie.js';
import fs from 'fs-extra';


// GET ALL Movies

export const getAll = async (req, res) => {
    console.log('si')

    const moviesFound = await MovieOrSerie.findAll({attributes: ['imageUrl', 'title', 'creation']});
    console.log('si')

    res.json({movies: moviesFound});
}
