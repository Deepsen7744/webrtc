import { Expert } from '@/model/expert'
import connectDB from '@/utils/db'
import { checkAuth } from '@/utils/feature'

export default async function handler(req, res) {
  await connectDB()

  try {
    // console.log(req.Expert.id)
    const { newSkills } = await req.body
    // console.log(req.headers.authorization)
    console.log('deep')
    const user = await checkAuth(req, res)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'login first',
      })
    }
    // console.log(user.id)

    // const token = req.headers.authorization?.replace('Bearer ', '')
    console.log(req.header)
    const expert = await Expert.findById(user.id)
    console.log(expert)

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      })
    }
    console.log(user.id)
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
