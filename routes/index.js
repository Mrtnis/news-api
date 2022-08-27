import express from 'express';
import { getAllCategories, getCategoryById, saveCategoryIntoTable, updateCategoryById, deleteCategoryById } from '../app/controllers/categoryController.js';
import { getAllBlogs, getBlogById, saveBlogIntoTable, updateBlogById, deleteBlogById } from '../app/controllers/blogController.js';

const router = express.Router();

// home router
router.get('/', (req, res) => {
  try {
    res.status(200).send('Welcome..');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// category router
router.get('/categories', getAllCategories);
router.get('/getCategoryById/:id', getCategoryById);
router.post('/addCategory', saveCategoryIntoTable);
router.patch('/updateCategoryById/:id', updateCategoryById);
router.delete('/deleteCategoryById/:id', deleteCategoryById);

// blog router
router.get('/blogs', getAllBlogs);
router.get('/getBlogById/:id', getBlogById);
router.post('/addBlog', saveBlogIntoTable);
router.patch('/updateBlogById/:id', updateBlogById);
router.delete('/deleteBlogById/:id', deleteBlogById);

// 404 router
router.get('*', (req, res) => {
  res.send('Page 404 Not Found!');
});

export default router;
