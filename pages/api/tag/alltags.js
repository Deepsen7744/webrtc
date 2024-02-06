// pages/api/getTags.js

import { Tags } from '@/model/Tags' // Update the path accordingly
import connectDB from '@/utils/db'

export default async function handler(req, res) {
  await connectDB()

  try {
    const tags = await Tags.find({}, '_id name') // Fetch only _id and name fields
    console.log(tags)

    return res.status(200).json({
      success: true,
      tags,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}
