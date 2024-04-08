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

const getDetails = async (req, res, next) => {
  try {
    // console.log('req.params', req.params)
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(board)

  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)

    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) { next(error) }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}