import express from 'express';
import router from './routes/index.js';
import './config.db.js';

// init express
const app = express();

// router app
app.use(express.json());
app.use(router);

// listen port
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
