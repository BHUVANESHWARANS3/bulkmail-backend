import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

// Create a transporter object using gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sbhuvi3105@gmail.com',
        pass: process.env.PASSWORD
    }
});


// Send a test email
app.post("/send", (req,res)=>{
    const arr = req.body.emails;
    const message = req.body.message;
    (async () => {
    try {
        const mailoptions = {
            from: 'sbhuvi3105@gmail.com',
            to: arr,
            subject: 'Test Email',
            text: 'This is a test email sent using Node.js and Nodemailer.',
            html:`<div>Hi this is test email <br>${message}</div>`
        };
        let data = await transporter.sendMail(mailoptions);
        console.log(data.messageId);
        res.send("email sent");
    }
    catch (error) {
        console.log("error");
    }
})(); 
});

app.listen(3000,()=>{
    console.log("sever started");
});

