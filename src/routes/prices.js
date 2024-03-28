import express from 'express';
import * as controllers from '../controllers/prices'


const router = express.Router()

router.get('/all', controllers.getPrice)

export default router