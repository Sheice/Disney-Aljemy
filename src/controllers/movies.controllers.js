import { Character } from "../models/Characters.js";
import { destroyImage, uploadImage } from "../utils/cloudinary.js";
import { MovieOrSerie } from "../models/MovierOrSerie.js";
import fs from "fs-extra";
import { Op } from "sequelize";

// GET ALL Movies

export const getAll = async (req, res) => {
  if (Object.entries(req.query).length !== 0) {
    let where = {};

    if (req.query.name) {
      where.name = { [Op.eq]: req.query.name };
    }

    if (req.query.idGender) {
      where.genderId = { [Op.eq]: req.query.idGender };
    }

    if (req.query.order) {
      try {
        console.log(req.query.order);
        const moviesFound = await MovieOrSerie.findAll({
          where: where,
          order: [
            ["title", `${req.query.order}`],
            ["genderId", `${req.query.order}`],
          ],

          attributes: ["imageUrl", "title", "creation"],
        });

        return res.json({ movies: moviesFound });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    }

    try {
      const moviesFound = await MovieOrSerie.findAll({
        attributes: ["imageUrl", "title", "creation"],
      });

      return res.json({ movies: moviesFound });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  const moviesFound = await MovieOrSerie.findAll({
    attributes: ["imageUrl", "title", "creation"],
  });

  res.json({ movies: moviesFound });
};

// CREATE MOVIE * I cant't add a lot of character to movie

export const createMovie = async (req, res) => {
  const { title, creation, calification, characterId, genderId } = req.body;

  const image = req.files?.image;

  if (image === undefined) {
    return res.status(400).json({ msg: "send a image" });
  }

  if (
    image.mimetype !== "image/jpg" &&
    image.mimetype !== "image/png" &&
    image.mimetype !== "image/jpeg"
  ) {
    await fs.unlink(image.tempFilePath);
    return res
      .status(400)
      .json({ msg: "format invalid only .jpg , .png or .jpeg" });
  }

  if (
    !title ||
    !creation ||
    !calification ||
    title.lenght === 0 ||
    creation.lenght === 0 ||
    calification.lenght === 0
  ) {
    await fs.unlink(image.tempFilePath);
    return res.status(400).json({ msg: "complete all of input" });
  }
  const calificationInt = parseInt(calification);
  const typeOfCalification = typeof calificationInt;

  if (typeOfCalification !== "number") {
    await fs.unlink(image.tempFilePath);
    return res.status(400).json({ msg: "only numbers in calification" });
  }

  if (calification < 0 || calification > 5) {
    await fs.unlink(image.tempFilePath);
    return res.status(400).json({ msg: "rang of calification 1 to 5" });
  }

  // // search all characters or serie of this character
  if (characterId !== undefined) {
    const characterFound = await Character.findOne({ where: { id: characterId } });

    // if doesn't found character associated
    if (characterFound === null) {
      
      try {
        const imageCloud = await uploadImage(image.tempFilePath);
        const movieWithCharacter = await MovieOrSerie.create({
          imageUrl: imageCloud.url,
          imagePublicId: imageCloud.public_id,
          title,
          // creation,
          calification,
          genderId
        });
  
        await fs.unlink(image.tempFilePath);
        return res.json({ movie: movieWithCharacter, msg: "Movie created" });
      } catch (error) {
        res.status(500).json({msg: error.message})
      }
    }
    // if found movie associated
    
   try {
    const imageCloud = await uploadImage(image.tempFilePath);
    const movieWithCharacter = await MovieOrSerie.create({
      imageUrl: imageCloud.url,
      imagePublicId: imageCloud.public_id,
      title,
      // creation,
      calification,
    genderId,
      Characters: [{
        imageUrl: characterFound.imageUrl,
        imagePublicId: characterFound. imagePublicId,
        name: characterFound.name,
        age: characterFound.age,
        weight: characterFound.weight,
        history: characterFound.history,
        character_movieOrSerie: {
          selfGranted: true
        }
      }]
    }, {
      include: Character
    });

    await fs.unlink(image.tempFilePath);
    return res.json({movie: movieWithCharacter, msg: "movie created" });
   } catch (error) {
    res.status(500).json({msg: error.message})
   }
  }
  // if there isn't characterId
  const imageCloud = await uploadImage(image.tempFilePath);
  try {
    const movieWithCharacter = await MovieOrSerie.create({
      imageUrl: imageCloud.url,
      imagePublicId: imageCloud.public_id,
      title,
      genderId,
      // creation,
      calification,
    });
    await fs.unlink(image.tempFilePath);
    return res.json({ movie: movieWithCharacter, msg: "Movie created" });
  } catch (error) {
    await fs.unlink(image.tempFilePath);
    return res.status(500).json({ msg: error.message });
  }
};

// UPDATE MOVIE

export const updateMovie = async (req, res) => {
  const { characterId } = req.body;
  const { id } = req.params;

  if (characterId !== undefined) {
    const character = await Character.findOne({ where: { id: characterId } });

    // if doesn't found character associated
    if (character === null) {
      try {
        const movieEdited = await MovieOrSerie.findByPk(id);
        movieEdited.set(req.body);
        await movieEdited.save();

        return res.json({ movieEdited, msg: "Movie edited" });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    }

    // if found movie associated
    try {
      const movieEdited = await MovieOrSerie.findByPk(id);
      movieEdited.set(req.body);
      await movieEdited.save();

      await movieEdited.addMovieOrSerie(character, {
        through: { selfGranted: false },
      });
      return res.json({ movieEdited, msg: "Movie edited" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  try {
    const movieEdited = await MovieOrSerie.findByPk(id);
    movieEdited.set(req.body);
    await movieEdited.save();

    return res.json({ movieEdited, msg: "Movie edited" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE MOVIE

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await MovieOrSerie.findOne({ where: { id } });
    const movieDeleted = await MovieOrSerie.destroy({ where: { id } });
    await destroyImage(movie.imagePublicId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET ONE Movie

export const getOneMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movieFound = await MovieOrSerie.findOne({
      where: { id: id },
      include: Character,
    });
    res.json({ movie: movieFound });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
