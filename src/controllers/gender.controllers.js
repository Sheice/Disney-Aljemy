import {Gender} from '../models/Gender.js'
import {destroyImage, uploadImage} from '../utils/cloudinary.js';
import fs from 'fs-extra';

export const  createGender = async (req, res) => {
    const {name} = req.body;
    const image = req.files?.image;

    if(image === undefined) {
        return res.status(400).json({msg: 'send a image'});
    }


    if(image.mimetype !== 'image/jpg' && image.mimetype !== 'image/png' && image.mimetype !== 'image/jpeg') {
        await fs.unlink(image.tempFilePath)
       return  res.status(400).json({msg: 'format invalid only .jpg , .png or .jpeg'});
        
    } 

    if(!name || name.lenght === 0) {
        await fs.unlink(image.tempFilePath)
        return res.status(400).json({msg: 'complete all of input'});
    }

    const imageCloud = await uploadImage(image.tempFilePath);

    const gender = await  Gender.create({
        imageUrl: imageCloud.url,
        imagePublicId: imageCloud.public_id,
        name
    });

    await fs.unlink(image.tempFilePath);
    return res.json({gender, msg:'Character created'});
}