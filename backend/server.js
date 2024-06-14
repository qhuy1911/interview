import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})