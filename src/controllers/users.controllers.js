import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
    const {name, email, password, confirmPassword} = req.body;

    console.log(name, email, password, confirmPassword);

    // validate if the inputs are empty
    if(!name || !email || !password || !confirmPassword){
        res.status(400).json({msg: 'Complete all of inputs'});
    }

    const expressionEmail =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if(!expressionEmail.test(email)){
        res.status(400).json({msg: 'Email invalid'});
    }



    // send emails
    // sendEmail({
    //     to: email,
    //     from: 'jaziel.isma@outlook.es',
    //     subject: 'Thanks for register in our page!',
    //     text: 'Welcome to Disney World of Alkemy.'
    // })

    
    res.json({msg: 'registrandose'});
}