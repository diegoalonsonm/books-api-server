import express, { response } from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';
import cors from 'cors';
import { bookRouter  } from './routes/bookRoute.js';

// create server
const app = express()

// important variables
const connectionURL = 'mongodb+srv://diegoalonsonm:cnmRGiqSXShA3jZt@cluster0.sgqq5ri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const PORT = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/books', bookRouter)

mongoose.connect(connectionURL).then(() => {
    console.log('Database connected')
    app.listen(PORT, () => {})
}) .catch((error) => {
    console.log('Error: ', error.message)
})
