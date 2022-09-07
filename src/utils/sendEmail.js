import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (msg) => {
    try {
        await sgMail.send(msg);
        console.log(`Msg to email Sent succesfully!`)
    } catch (error) {
        return error.error
    }
}