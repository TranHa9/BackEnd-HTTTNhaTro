import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import *as userController from '../controllers/user'

const router = express.Router()

router.use(verifyToken)
router.get('/get-current', userController.getCurrent)
router.put('/', userController.updateUser)
router.post('/create-user', userController.createUser)
router.get('/get-all-user', userController.getAllUser)
router.delete('/delete-user', userController.deleteUser)
router.put('/update-user', userController.updateUserData)

export default router