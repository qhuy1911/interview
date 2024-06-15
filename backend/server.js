import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8080;
const CONNECTION_STRING = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dev.t6edveb.mongodb.net/?retryWrites=true&w=majority&appName=dev`

app.use(cors())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// connect DB
mongoose.connect(CONNECTION_STRING).then(async () => {
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}).catch((error) => {
  console.error(error);
});