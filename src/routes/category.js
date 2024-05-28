import express from 'express';
import * as controllers from '../controllers/category';
import verifyToken from '../middlewares/verifyToken';


const router = express.Router()
router.get('/all', controllers.getCategories)
router.get('/all-limit', controllers.getCategoriesLimit)

router.use(verifyToken)
router.post('/create-category', controllers.createCategory)
router.put('/update-category', controllers.updateCategory)
router.delete('/delete-category', controllers.deleteCategory)

export default router