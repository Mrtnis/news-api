import Category from '../models/category.js';
import Blog from '../models/blog.js';

export const getAllCategories = async (req, res) => {
  try {
    const result = await Category.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const result = await Category.findOne({ _id: req.params.id });
    if (result == null) {
      return res.status(404).json({
        message: 'Data not found!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: 'The category you request is not found. Please use the correct id!',
    });
  }
};

export const saveCategoryIntoTable = async (req, res) => {
  const category = new Category(req.body);
  const dataCategoryPrevious = await Category.find();
  const titleCategory = category.title;
  const checkData = dataCategoryPrevious.some((data) => data.title.toLowerCase() == titleCategory.toLowerCase());

  if (checkData) {
    return res.status(400).json({
      error: 'DATA ALREADY EXIST',
      message: 'The title category you added is already exist. Please insert different title!',
    });
  }

  try {
    const result = await category.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateCategoryById = async (req, res) => {
  const dataCategoryPrevious = await Category.find();
  const idCategory = req.params.id;
  const checkData = dataCategoryPrevious.some((data) => data._id == idCategory);
  if (!checkData) {
    return res.status(404).json({
      error: 'DATA NOT FOUND',
      message: 'The data category you updated is not found. Please check your category id!',
    });
  }

  try {
    const result = await Category.updateOne({ _id: req.params.id }, { $set: req.body });
    if (!result.acknowledged) {
      return res.status(400).json({
        mesage: 'The object data you sent is wrong!.',
      });
    }
    if (result.modifiedCount == 0) {
      return res.status(200).json({
        mesage: 'There is no key of data is changed.',
      });
    }
    res.status(200).json('Data category is changed!');
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCategoryById = async (req, res) => {
  const idCategory = req.params.id;

  // check if data not found
  const dataCategoryPrevious = await Category.find();
  const checkData = dataCategoryPrevious.some((data) => data._id == idCategory);
  if (!checkData) {
    return res.status(404).json({
      error: 'DATA NOT FOUND',
      message: 'The data category you deleted is not found. Please check your data!',
    });
  }

  // check if data category is used by blog
  const dataBlog = await Blog.findOne({ category: idCategory });
  if (dataBlog) {
    return res.status(400).json({
      error: 'DATA IS USED',
      message: 'The data category you deleted is used by blog. Please delete the blog first!',
    });
  }

  try {
    const result = await Category.deleteOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
