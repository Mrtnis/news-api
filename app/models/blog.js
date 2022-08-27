import mongoose from 'mongoose';

const Blog = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // category: {
  //   type: String,
  //   required: true,
  // },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  },
  description: {
    type: String,
  },
  contents: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Blogs', Blog);
