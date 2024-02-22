import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)

    // Điều hướng dữ liệu sang thằng service
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Xuantung test error')
    const createdBoard = await boardService.createNew(req.body)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard)

  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}