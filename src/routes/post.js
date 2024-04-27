import express from 'express';
import * as postControllers from '../controllers/post';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router()
router.get('/all', postControllers.getPosts)
router.get('/limit', postControllers.getPostsLimit)
router.get('/new-post', postControllers.getNewPosts)

router.use(verifyToken)
router.post('/create-new', postControllers.createNewPost)
router.get('/limit-admin', postControllers.getPostsLimitAdmin)
router.put('/update-post', postControllers.updatePost)
router.delete('/delete-post', postControllers.deletePost)
router.post('/save-post', postControllers.addSavePost)
router.get('/limt-save-post', postControllers.getSavePostsLimit)
router.delete('/delete-save-post', postControllers.deleteSavePost)

export default router