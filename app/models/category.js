import mongoose from 'mongoose';

const Category = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export default mongoose.model('Categories', Category);
