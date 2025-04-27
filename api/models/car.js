import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  vin: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    required: true,
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual'],
    required: true,
  },
  rentalPricePerDay: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  }
}, {
  timestamps: true // createdAt, updatedAt
});

const Car = mongoose.model('CarInfo', carSchema);

export default Car;
