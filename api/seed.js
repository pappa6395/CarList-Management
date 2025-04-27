import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/car.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/car-management';

const seedCars = [
  {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    color: 'White',
    registrationNumber: 'ABC123',
    vin: '1HGCM82633A004352',
    mileage: 20000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    rentalPricePerDay: 50,
    availability: true,
    location: 'Bangkok',
    imageUrl: 'https://source.unsplash.com/random/400x300/?toyota',
    notes: 'Well maintained and serviced regularly.',
  },
  {
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    color: 'Black',
    registrationNumber: 'XYZ789',
    vin: '2HGCM82633A004353',
    mileage: 30000,
    fuelType: 'Diesel',
    transmission: 'Manual',
    rentalPricePerDay: 45,
    availability: true,
    location: 'Chiang Mai',
    imageUrl: 'https://source.unsplash.com/random/400x300/?honda',
    notes: 'Low mileage, in excellent condition.',
  },
  {
    brand: 'Ford',
    model: 'Focus',
    year: 2021,
    color: 'Blue',
    registrationNumber: 'LMN456',
    vin: '3HGCM82633A004354',
    mileage: 15000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    rentalPricePerDay: 60,
    availability: false,
    location: 'Phuket',
    imageUrl: 'https://source.unsplash.com/random/400x300/?ford',
    notes: 'Currently under maintenance.',
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected ✅');

    await Car.deleteMany(); // Clear existing cars
    console.log('Old cars removed 🚗🗑️');

    await Car.insertMany(seedCars); // Insert seed cars
    console.log('Database seeded with sample cars 🎯');

    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
