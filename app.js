import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';

// init express
const app = express();

// config db
mongoose.connect('mongodb://localhost:27017/blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.log(`Database error ${err}`));
db.once('open', () => console.log('Database Connected!'));

// router app
app.use(express.json());
app.use(router);

// listen port
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
