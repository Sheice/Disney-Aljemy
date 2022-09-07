import {Character} from '../models/Characters.js';

export const getAll = async (req, res) => {

    const CharactersFound = await Character.findAll({attributes: ['image', 'name']});

    res.json({characters: CharactersFound});
}