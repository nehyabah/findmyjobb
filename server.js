import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'


//DB and AuthenticateUser
import connectDB from "./db/connect.js";

//Routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

//Middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

app.use(express.json())

app.get('/', (req, res) => {
    
    res.send('Welcome')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5004



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
          console.log(`Server is listening to port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}
 
start()