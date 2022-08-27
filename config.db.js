import mongoose from 'mongoose';

// config db
mongoose.connect('mongodb://localhost:27017/blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.log(`Database error ${err}`));
db.once('open', () => console.log('Database Connected!'));
