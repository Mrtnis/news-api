import Blog from '../models/blog.js';
import Category from '../models/category.js';

// async function getDataCategory(idCategory) {
//   const category = await Category.findOne({ _id: idCategory });
//   return category.title;
// }

export const getAllBlogs = async (req, res) => {
  try {
    const result = await Blog.find();
    // const finalResult = result.forEach(async (b) => {
    //   b.category = await getDataCategory(b.category);
    // });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const result = await Blog.findOne({ _id: req.params.id });
    if (result == null) {
      return res.status(404).json({
        message: 'Data not found!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: 'The blog you request is not found. Please use the correct id!',
    });
  }
};

export const saveBlogIntoTable = async (req, res) => {
  const blog = new Blog(req.body);

  // check if data is allready exist
  const dataBlogPrevious = await Blog.find();
  const title = blog.title;
  const checkData = dataBlogPrevious.some((data) => data.title.toLowerCase() == title.toLowerCase());
  if (checkData) {
    return res.status(400).json({
      error: 'DATA ALREADY EXIST',
      message: 'The title blog you added is already exist. Please insert different title!',
    });
  }

  // check if category id is wrong
  const dataCategory = await Category.find();
  const idCategory = blog.category;
  const checkCategory = dataCategory.some((data) => data._id == idCategory);
  if (!checkCategory) {
    return res.status(404).json({
      error: 'CATEGORY NOT FOUND',
      message: 'The catgeory id you added is not found. Please check again!',
    });
  }

  try {
    const result = await blog.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateBlogById = async (req, res) => {
  const idBlog = req.params.id;

  // check if data empty
  const dataBlogPrevious = await Blog.find();
  const checkData = dataBlogPrevious.some((data) => data._id == idBlog);
  if (!checkData) {
    return res.status(404).json({
      error: 'DATA NOT FOUND',
      message: 'The data blog you updated is not found. Please check your blog id!',
    });
  }

  // check if category id is wrong
  if ('category' in req.body) {
    const dataCategory = await Category.find();
    const idCategory = req.body.category;
    const checkCategory = dataCategory.some((data) => data._id == idCategory);
    if (!checkCategory) {
      return res.status(404).json({
        error: 'CATEGORY NOT FOUND',
        message: 'The category id is wrong. Please check again!',
      });
    }
  }

  try {
    const result = await Blog.updateOne({ _id: req.params.id }, { $set: req.body });
    if (!result.acknowledged) {
      return res.status(400).json({
        mesage: 'The object data you sent is wrong!.',
      });
    }
    if (result.modifiedCount == 0) {
      return res.status(200).json({
        mesage: 'There is no changed of data.',
      });
    }
    res.status(200).json('Data category is changed!');
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  const dataBlogPrevious = await Blog.find();
  const idBlog = req.params.id;
  const checkData = dataBlogPrevious.some((data) => data._id == idBlog);
  if (!checkData) {
    return res.status(404).json({
      error: 'DATA NOT FOUND',
      message: 'The data you deleted is not found. Please check your id!',
    });
  }

  try {
    const result = await Blog.deleteOne({ _id: req.params.id });
    res.status(200).json('Data blog is deleted!');
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
