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

// CREATE CHARACTER

export const createMovie = async (req, res) => {
    const {title, creation, calification, characterId} = req.body;

    const image = req.files?.image;

    if(image === undefined) {
        return res.status(400).json({msg: 'send a image'});
    }


    if(image.mimetype !== 'image/jpg' && image.mimetype !== 'image/png' && image.mimetype !== 'image/jpeg') {
        await fs.unlink(image.tempFilePath)
       return  res.status(400).json({msg: 'format invalid only .jpg , .png or .jpeg'});
        
    } 

    if(!title || !creation || !calification || title.lenght === 0 || creation.lenght === 0 || calification.lenght === 0 ) {
        await fs.unlink(image.tempFilePath)
        return res.status(400).json({msg: 'complete all of input'});
        
    }

    const calificationInt = parseInt(calification);
    const typeOfCalification = typeof(weightFloat);


    if(typeOfCalification !== 'number' ) {
        return res.status(400).json({msg:'only numbers in calification'});
    }

    if(calification < 0 || calification > 5) {
        return res.status(400).json({msg: 'rang of calification 1 to 5'});
    }

    

   

    // // search all characters or serie of this character

    if(characterId !== undefined) {

    const character =   await Character.findOne({where: {id: characterId}});

        // if doesn't found character associated
    if(character === null) {
         const imageCloud = await uploadImage(image.tempFilePath);
        
        const movieWithCharacter = await  MovieOrSerie.create({
            imageUrl: imageCloud.url,
            imagePublicId: imageCloud.public_id,
           title,
            creation,
           calification
        });

        await fs.unlink(image.tempFilePath);
        return res.json({movie: movieWithCharacter, msg:'Movie created'});
        
    }
    // if found movie associated
           
        const imageCloud = await uploadImage(image.tempFilePath);

        const movieWithCharacter = await  MovieOrSerie.create({
            imageUrl: imageCloud.url,
            imagePublicId: imageCloud.public_id,
           title,
            creation,
           calification
        });

        await fs.unlink(image.tempFilePath);

        await movieWithCharacter.addMovieOrSerie(character, { through: { selfGranted: false } });
         return res.json({movie: movieWithCharacter, msg:'movie created'});
    
    }

}
