import express from 'express'
import { boardRoute } from './boardRoute'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

// Check API v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

// Boards API
Router.use('/boards', boardRoute)

export const APIs_V1 = Router