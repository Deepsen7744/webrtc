import connectDB from '@/utils/db'
import { Expert } from '@/model/expert'
import otpGenerator from 'otp-generator'

import mailSender from '@/utils/mailsender'
import emailTemplate from '@/templates/otpsend'

export default async function handler(req, res) {
  // console.log("error is coming ...");
  await connectDB()

  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }
    const { skills } = req.body
    console.log(skills)
    const currentTime = new Date()
    console.log(currentTime)
    const experts = await Expert.find({
      skills: { $in: skills },

      'Time.start': { $lte: currentTime },
      'Time.end': { $gte: currentTime },
    })
    console.log(currentTime)
    var roomid = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    console.log('OTP generated: ', roomid)

    //   let result = await OTP.findOne({ otp: otp });

    //   const otpPayload = { email, roomid};
    for (let expert of experts) {
      // Extract the expert's email
      console.log(expert.email)
      const email = expert.email

      try {
        // Send the email
        const mailResponse = await mailSender(
          email,
          'Verification Email from DoubtSolver',
          emailTemplate(roomid)
        )
        console.log('Email sent Successfully: ', mailResponse)
      } catch (error) {
        console.log('Error occurred while sending mails: ', error)
        return res.status(500).json({
          success: false,
          message: 'Email send failed',
          email,
        })
      }
    }

    res.send({
      success: true,
      experts,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      err,
    })
  }
}
