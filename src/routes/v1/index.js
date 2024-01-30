import express from 'express'
import { boardRoute } from './boardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'APIs V1 are ready to use' })
})

Router.use('/boards', boardRoute)
export const APIs_V1 = Router