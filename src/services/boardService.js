/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async(reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }


    // Gọi tới thằng Model để xử lý lưu bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard)
    // console.log(createdBoard)

    // lấy bản ghi board sau khi gọi (tùy mục đích dự án mà cần có bước này)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log(getNewBoard)

    // Làm thêm các xử lý logic khác với các Collection khác tùy vào đặc thù dự án,..
    // Bắn email, notifycation về cho admin khi có một cái board mới được tạo,...

    // Trả kết quả về trong Services luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async(boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    // Trả kết quả về trong Services luôn phải có return
    return board
  } catch (error) { throw error }
}


export const boardService = {
  createNew,
  getDetails
}