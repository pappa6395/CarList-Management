import Car from '../models/car.js';
import { CreateCarSchema } from '../dtos/createCar.dto.js'
import { UpdateCarSchema } from '../dtos/updateCar.dto.js'

// GET /api/cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/cars/:id
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/cars
export const createCar = async (req, res) => {
  try {
    // Validate the incoming body!
    const validatedData = CreateCarSchema.parse(req.body);

    const newCar = new Car(validatedData);
     // Check if VIN already exists
     const existingCar = await Car.findOne({ 
      vin: newCar.vin,
      registrationNumber: newCar.registrationNumber
    });
     if (existingCar) {
       return res.status(400).json({ message: 'VIN already exists' });
     }
     
    await newCar.save();

    res.status(201).json(newCar);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: error.message });
  }
}

// PUT /api/cars/:id
export const updateCar = async (req, res) => {
  const { id } = req.params;

  try {
    const validatedData = UpdateCarSchema.parse(req.body);

    const existingCar = await Car.findOne({
      vin:  validatedData.vin,
      registrationNumber: validatedData.registrationNumber,
    })
    if (existingCar && existingCar._id.toString() !== id) {
      return res.status(400).json({ message: 'VIN already exists' });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: error.message });
  }
};


// DELETE /api/cars/:id
export const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
