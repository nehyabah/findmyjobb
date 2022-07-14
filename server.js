import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()


//DB and AuthenticateUser
import connectDB from "./db/connect.js";

//Routers
import authRouter from './routes/authRoutes.js'

//Middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

app.use(express.json())

app.get('/', (req, res) => {
    
    res.send('Welcome')
})

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