import { Gender } from "../models/Gender.js";
import { destroyImage, uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

// CREATE GENDER

export const createGender = async (req, res) => {
  const { name } = req.body;
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
      .json({ msg: "format invalid only .jpg , .png, .jpeg" });
  }

  if (!name || name.lenght === 0) {
    await fs.unlink(image.tempFilePath);
    return res.status(400).json({ msg: "send a name" });
  }

  const imageCloud = await uploadImage(image.tempFilePath);

  try {
    const gender = await Gender.create({
      imageUrl: imageCloud.url,
      imagePublicId: imageCloud.public_id,
      name,
    });
    await fs.unlink(image.tempFilePath);
    return res.json({ gender, msg: "Character created" });
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
};

// DELETE GENDER

export const deleteGender = async (req, res) => {
  const { id } = req.params;

  try {
    const gender = await Gender.findOne({ where: { id } });
    const genderDeleted = await Gender.destroy({ where: { id } });
    const destroyCloduImage = await destroyImage(gender.imagePublicId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
