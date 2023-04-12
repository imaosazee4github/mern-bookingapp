import express from 'express';
import {createHotel,updateHotel,deleteHotel,getSingleHotel,getHotels, countByType, countByCity} from '../controllers/hotelsControllers.js';
import {verifyisAdmin} from '../utils/verifyToken.js'

const router = express.Router();

router.post('/',verifyisAdmin, createHotel)


router.put('/:id', verifyisAdmin, updateHotel)

router.delete('/find/:id', verifyisAdmin, deleteHotel)

router.get('/:id', getSingleHotel)



router.get('/', getHotels)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)



export default router;