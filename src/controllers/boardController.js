import { StatusCodes } from 'http-status-codes'


const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    console.log('req.query', req.query)
    console.log('req.params', req.params)

    // Điều hướng dữ liệu sang thằng service
    throw new Error('Xuantung test error')

    // Có kết quả thì trả về phía client
    // res.status(StatusCodes.CREATED).json({ message: 'POST form Controller: API create new boards' })

  } catch (error) {
    // console.log(error)
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: new Error(error).message
    // })
  }
}

export const boardController = {
  createNew
}