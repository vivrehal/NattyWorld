import otpModal from "../models/otp.modal.js";
import nodemailer from "nodemailer";
const sendOtpUtil=async(email)=>{
    try {
        const otp=Math.floor(100000 + Math.random() * 900000);

        const isOtpExists=await otpModal.findOne({email});

        let otpObj;
        if(isOtpExists){
            await otpModal.findOneAndUpdate({email},{otp});
        }
        else {
            otpObj=await otpModal.create({email,otp});
        }
        // send email

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT, 
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD 
            }
        });

        async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"NattyWorld 👻" <bernita.gibson73@ethereal.email>', // sender address
            to: `${email}`, // list of receivers
            subject: "Validate Your Account", // Subject line
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing Natty World. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Natty World</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>Natty World</p>
                        <p>India</p>
                    </div>
                    </div>
                </div>`
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }

        main().catch(console.error);

        return otpObj;

    }
    catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }

}

export default sendOtpUtil;