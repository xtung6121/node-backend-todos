/* eslint-disable no-console */
import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
const app = express()

const START_SERVER = () => {

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())

    res.send('<h1>HELLO</h1>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, Back-end Server is running successfully at host: ${ env.APP_HOST } and port ${ env.APP_PORT }`)
  })

}


(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB ()
    console.log('2. Connected to MongoDB Cloud Atlas!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }

}) ()


// console.log('1. Connecting to MongoDB Cloud Atlas...')

// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })