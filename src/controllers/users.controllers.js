import {encryptPassword, comparePassword} from '../utils/bcryptPassword.js';
import {User} from '../models/Users.js';
import {sendEmail} from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    
    const {name, email, password, confirmPassword} = req.body;

    // validate if the inputs are empty
    if(name.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0 ){
        return res.status(400).json({msg: 'Complete all of inputs'});
    }

    const expressionEmail =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if(!expressionEmail.test(email)){
        return res.status(400).json({msg: 'Email invalid'});
    }

    if(password !== confirmPassword) {
        return res.status(400).json({msg: `Passwords don't match`});
    }

    // validate if the user exist

    const userFound = await User.findOne({where: {email: email}});


    if(userFound) {
        return res.json({msg: `The user already exist`});
    }

    // encrypting password

    const passwordEncrypted = await encryptPassword(password);


    // saving the user in DB

    const saveUser = await User.create({
        name,
        email,
        password: passwordEncrypted
    });

    const token = jwt.sign({id: saveUser.id}, process.env.PASSWORD_TOKEN,{
        expiresIn: 60 * 60 *24  // 24 hours
    });

    // send emails
    sendEmail({
        to: email,
        from: 'jaziel.isma@outlook.es',
        subject: 'Thanks for register in our page!',
        text: 'Welcome to Disney World of Alkemy.'
    })

    return res.json({user: saveUser, token, msg: 'Register completed, check your email pls'});
}