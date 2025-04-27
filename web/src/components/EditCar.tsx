import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import API from '../api/carApi';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Car } from '../lib/types';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState<Omit<Car, '_id'>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    registrationNumber: '',
    vin: '',
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    rentalPricePerDay: 0,
    availability: true,
    location: '',
    imageUrl: '',
    notes: ''
  });
  
  useEffect(() => {
    API.get(`/${id}`)
      .then((res) => {
        setCar(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCar(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : 
              type === 'checkbox' ? (e.target as HTMLInputElement).checked :
              value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        await API.put(`/${id}`, {
          brand: car.brand,
          model: car.model,
          year: Number(car.year),
          color: car.color,
          registrationNumber: car.registrationNumber,
          vin: car.vin,
          mileage: Number(car.mileage),
          fuelType: car.fuelType,
          transmission: car.transmission,
          rentalPricePerDay: Number(car.rentalPricePerDay),
          availability: car.availability,
          location: car.location,
          imageUrl: car.imageUrl,
          notes: car.notes,
        });
        toast.success('Car updated successfully!');
        navigate('/');
      } catch (err) {
        console.error(err);
        toast.error('Failed to update car. Please try again.');
      } finally {
        setLoading(false);
      }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
        <motion.div 
            className='flex flex-col justify-center items-center w-full'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                type: "keyframes",
                stiffness: 80,
                damping: 8,
            }}
        >
            <div className='flex items-start justify-start pb-4 md:w-4xl w-xl'>
                <button 
                    onClick={() => navigate('/')} 
                    className="text-blue-500 hover:underline text-lg 
                    flex items-center gap-2">
                    <span className='bg-white rounded-full px-1.5 py-1.5'><ChevronLeft className='w-8 h-8' /></span>
                    Back to Car List
                </button>
            </div>
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl h-fit">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Car</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h2>
                
                <div>
                  <label className="block text-gray-600 mb-1">Brand*</label>
                  <input
                    type="text"
                    name="brand"
                    className="w-full border rounded-lg px-3 py-2"
                    value={car.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-1">Model*</label>
                  <input
                    type="text"
                    name="model"
                    className="w-full border rounded-lg px-3 py-2"
                    value={car.model}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-1">Year*</label>
                  <input
                    type="number"
                    name="year"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full border rounded-lg px-3 py-2"
                    value={car.year}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-1">Color*</label>
                  <input
                    type="text"
                    name="color"
                    className="w-full border rounded-lg px-3 py-2"
                    value={car.color}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Registration & Identification */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Registration & Identification</h2>
                
                <div>
                  <label className="block text-gray-600 mb-1">Registration Number*</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    className="w-full border rounded-lg px-3 py-2"
                    value={car.registrationNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-1">VIN (17 characters)*</label>
                  <input
                    type="text"
                    name="vin"
                    minLength={17}
                    maxLength={17}
                    className="w-full border rounded-lg px-3 py-2"
                    value={car.vin}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-1">Mileage (km)*</label>
                  <input
                    type="number"
                    name="mileage"
                    min="0"
                    className="w-full border rounded-lg px-3 py-2"
                    value={car.mileage}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-1">Location*</label>
                  <input
                    type="text"
                    name="location"
                    className="w-full border rounded-lg px-3 py-2"
                    value={car.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Specifications</h2>
              
              <div>
                <label className="block text-gray-600 mb-1">Fuel Type*</label>
                <select
                  name="fuelType"
                  className="w-full border rounded-lg px-3 py-2"
                  value={car.fuelType}
                  onChange={handleChange}
                  required
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-600 mb-1">Transmission*</label>
                <select
                  name="transmission"
                  className="w-full border rounded-lg px-3 py-2"
                  value={car.transmission}
                  onChange={handleChange}
                  required
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-600 mb-1">Rental Price (per day)*</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">฿</span>
                  <input
                    type="number"
                    name="rentalPricePerDay"
                    min="0"
                    step="100"
                    className="w-full border rounded-lg px-8 py-2"
                    value={car.rentalPricePerDay}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="availability"
                  id="availability"
                  className="h-4 w-4 text-blue-600 rounded"
                  checked={car.availability}
                  onChange={handleChange}
                />
                <label htmlFor="availability" className="ml-2 text-gray-600">
                  Available for rent
                </label>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Additional Information</h2>
              
              <div>
                <label className="block text-gray-600 mb-1">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  className="w-full border rounded-lg px-3 py-2"
                  value={car.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/car-image.jpg"
                />
              </div>
              
              <div>
                <label className="block text-gray-600 mb-1">Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2"
                  value={car.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

                <button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 
                    text-white py-2 rounded-lg"
                    disabled={loading}
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    ) : (
                        "Update Car"
                    )}
                </button>
            </form>
        </motion.div>
    </div>
  );
};

export default EditCar;
