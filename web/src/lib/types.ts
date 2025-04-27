export type Car = {
    _id: string;              // Unique ID from database
    brand: string;            // Ex: Toyota, Honda
    model: string;            // Ex: Corolla, Civic
    year: number;             // Ex: 2020
    color: string;            // Ex: White, Black
    registrationNumber: string; // Ex: license plate
    vin: string;              // Vehicle Identification Number (very important)
    mileage: number;          // Current mileage
    fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'; // type of fuel
    transmission: 'Automatic' | 'Manual'; // gear
    rentalPricePerDay: number; // How much per day in ฿ or $
    availability: boolean;    // Is car available or rented?
    location: string;         // City or branch location
    imageUrl?: string;        // (Optional) car photo
    notes?: string;           // Optional admin notes
  };