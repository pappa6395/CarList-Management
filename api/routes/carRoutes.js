import express from 'express';
import { 
  getAllCars, 
  createCar, 
  getCarById, 
  updateCar, 
  deleteCar 
} from '../controllers/carController.js';

const router = express.Router();

// Routes
router.get('/', getAllCars);
router.post('/', createCar);
router.get('/:id', getCarById);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;
