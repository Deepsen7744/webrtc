import { Expert } from '@/model/expert'
import connectDB from '@/utils/db'

export default async function handler(req, res) {
  await connectDB()

  try {
    const { expertId, newSkills } = await req.body

    console.log(expertId)
    const expert = await Expert.findById(expertId)
    console.log(expert)

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      })
    }
    console.log(newSkills)

    expert.skills.push(...newSkills)
    console.log(expert)

    await expert.save()

    return res.status(200).json({
      success: true,
      message: 'Skills added to expert array',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}
