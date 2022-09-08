import {Character} from '../models/Characters.js';
import {destroyImage, uploadImage} from '../utils/cloudinary.js';
import {MovieOrSerie} from '../models/MovierOrSerie.js';
import fs from 'fs-extra';

// GET ALL CHARACTER

export const getAll = async (req, res) => {

    const CharactersFound = await Character.findAll({attributes: ['imageUrl', 'name']});

    res.json({characters: CharactersFound});
}

// CREATE CHARACTER

export const createCharacter = async (req, res) => {
    const {name, age, history, weight, movieOrSerieId} = req.body;

    const image = req.files?.image;

    if(image === undefined) {
        return res.status(400).json({msg: 'send a image'});
    }


    if(image.mimetype !== 'image/jpg' && image.mimetype !== 'image/png' && image.mimetype !== 'image/jpeg') {
        await fs.unlink(image.tempFilePath)
       return  res.status(400).json({msg: 'format invalid only .jpg , .png or .jpeg'});
        
    } 

    if(!name || !age || !history || !weight || name.lenght === 0 || age.lenght === 0 || history.lenght === 0 || weight.lenght === 0 ) {
        await fs.unlink(image.tempFilePath)
        return res.status(400).json({msg: 'complete all of input'});
        
    }

    const weightFloat = parseFloat(weight);
    const typeOfWeight = typeof(weightFloat);
    const ageNumber = parseInt(age);
    const typeOfAge = typeof(ageNumber);


    if(typeOfWeight !== 'number' &&  typeOfAge !== 'number' ) {
        return res.json('only numbers in weight and age');
    }

    

   

    // // search all movie or serie of this character

    if(movieOrSerieId !== undefined) {

    const movie =   await MovieOrSerie.findOne({where: {id: movieOrSerieId}});

        // if doesn't found movie associated
    if(movie === null) {
         const imageCloud = await uploadImage(image.tempFilePath);
        
        const characterWithMovie = await  Character.create({
            imageUrl: imageCloud.url,
            imagePublicId: imageCloud.public_id,
            name,
            age,
            weight,
            history,
        });

        await fs.unlink(image.tempFilePath);
        return res.json({character: characterWithMovie, msg:'Character created'});
        
    }
    // if found movie associated
           
        const imageCloud = await uploadImage(image.tempFilePath);

        const characterWithMovie = await  Character.create({
            imageUrl: imageCloud.url,
            imagePublicId: imageCloud.public_id,
            name,
            age,
            weight,
            history,
        });

        await fs.unlink(image.tempFilePath);

        await characterWithMovie.addMovieOrSerie(movie, { through: { selfGranted: false } });
         return res.json({character: characterWithMovie, msg:'Character created'});
    
    }

}

// EDIT CHARACTER

export const updateCharacter = async (req, res) => {
    const {name, age, history, weight, movieOrSerieId} = req.body;
    const {id} = req.params;

    if(!name || !age || !history || !weight || name.lenght === 0 || age.lenght === 0 || history.lenght === 0 || weight.lenght === 0 ) {
        return res.status(400).json({msg: 'complete all of input'});
        
    }

    const weightFloat = parseFloat(weight);
    const typeOfWeight = typeof(weightFloat);
    const ageNumber = parseInt(age);
    const typeOfAge = typeof(ageNumber);

    if(typeOfWeight !== 'number' &&  typeOfAge !== 'number' ) {
        return res.json('only numbers in weight and age');
    }

    if(movieOrSerieId !== undefined) {

        const movie =   await MovieOrSerie.findOne({where: {id: movieOrSerieId}});
    
            // if doesn't found movie associated
        if(movie === null) { 
            
            const characterEdited = await  Character.findByPk(id);
            characterEdited.set(req.body);
            await characterEdited.save();
    
            return res.json({characterEdited, msg:'Character edited'});
            
        }
        // if found movie associated
               
           
    
        const characterEdited = await  Character.findByPk(id);
        characterEdited.set(req.body);
        await characterEdited.save();

        await characterEdited.addMovieOrSerie(movie, { through: { selfGranted: false } });
        return res.json({characterEdited, msg:'Character edited'});
}
}

// DELETE CHARACTER

export const delteCharacter = async (req, res) => {
    const {id} = req.params;

   try {
    const characterDeleted = await Character.destroy({where: {id}});
    const destroyCloduImage = await destroyImage(characterDeleted.imagePublicId);
    res.status(204);

   } catch (error) {
    res.status(500).json({msg: error.message})
   }

   
}

// GET ONE CHARACTER

export const  getOneCharacter = async (req, res) => {
    const {id} = req.params;

    try {
        const characterFound = await Character.findOne({
            where: {id: id},
            include: MovieOrSerie
        })
        res.json({character: characterFound});
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}