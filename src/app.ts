import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userRouter from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// application routers
app.use('/api/v1/users', userRouter)

// testing functions
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully!')
})

export default app
