import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  /*
  Mặc định chúng ta không cần phải custom messenger ở phía BE làm gì để FE tự validate và
  custom message phía FE cho đẹp
  BE chỉ cần validate đảm bảo dữ liệu chuẩn xác, và trả về message mặc định từ thư viện là được
  Quan trọng: Việc validate dữ liệu BẮt buộc phải có ở BE vì đây là điểm cuối lưu trữ dữ liệu vào DB
  Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả BE và FE.
  */
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log(req.body)

    // Chỉ định ebortEarly có nhiều lỗi trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { ebortEarly: false })

    // Validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang controller
    next()
    res.status(StatusCodes.CREATED).json({ message: 'POST form Validation: API get list boards' })
  } catch (error) {
    console.log(new Error(error).message)
    // const customError = new ()
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}
