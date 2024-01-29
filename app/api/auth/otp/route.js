import { User } from "@/model/user";
import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import otpGenerator from "otp-generator"
import { OTP } from "@/model/otp";
import mailSender from "@/utils/mailsender";
import emailTemplate from "@/templates/otpsend"


//!sendOTP
export async function POST (req){
    await connectDB();

    try {
        const {email} = await req.json();   
        console.log(email);                                  //fetch email from request ki body
        const checkUserPresent = await User.findOne({email});        //check if user already exist

        if(checkUserPresent) {                                      //if user already exist , then return a response
            return NextResponse.json({ 
                success: false,
                 message: "user alredy registered" 
            });
        }

        var otp = otpGenerator.generate(6, {                       //generate otp of 6 digit number donot contain uppercase,lowercase,specialchar; 
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated: ", otp );

        let result = await OTP.findOne({otp: otp});               //check unique otp or not
        while(result){                                            // if result is true so we regenerate otp;
            otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
            result = await OTP.findOne({otp: otp}); 
        }
        // create a model of otp
        const otpPayload = {email, otp};

            

    try{
		// three things email, title, body
        const mailResponse = await mailSender(email, "Verification Email from DoubtSolver", emailTemplate(otp));
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error) {
        console.log("error occured while sending mails: ", error);
        // throw error;
        return NextResponse.json({ 
            success: false,
             message: "OTP Sent failed" ,
             otp,
        });
    }

        //create an entry in OTP in DB and this OTP is used in SignUp to find response;
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody);

       
        return NextResponse.json({ 
            success: true,
             message: "OTP Sent Successfully" ,
             otp,
        });
    }
    catch(error) {
        console.log(error);
        return NextResponse.json({ 
            success: false,
             message: error ,
             
        });
    }

};


// async function sendVerificationEmail(email, otp) {
//     try{
// 		// three things email, title, body
//         const mailResponse = await mailSender(email, "Verification Email from DoubtSolver", emailTemplate(otp));
//         console.log("Email sent Successfully: ", mailResponse);
//     }
//     catch(error) {
//         console.log("error occured while sending mails: ", error);
//         throw error;
//     }
// }

// OTPSchema.pre("save", async function(next){                        //here pre-save means otp is sended before the saving of OTPSchema.
//     // Only send an email when a new document is created
// 	if (this.isNew) {
// 		await sendVerificationEmail(this.email, this.otp);
// 	}
//     next();
// }) 
