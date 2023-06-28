const nodemailer = require("nodemailer")


const sendEmail = async (sub, sender_name, msg, sent_from, send_to, reply_to) =>{

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls:{
            rejectUnauthorized: false,
        }
    })

    let options = {
        from: sent_from,
        to: send_to,
        subject: `${sender_name} says ${sub}`,
        text: msg,
        replyTo: reply_to
    }

    // send email

    transporter.sendMail(options, (err, info)=>{
        if(err){
            console.error(err);
        }else{
            console.log(info);
        }
    })
}

module.exports = sendEmail;