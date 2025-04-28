import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import API from '../api/carApi';
import { Car } from '../lib/types';


type CarsContextType = {
  cars: Car[];
  filteredCars: Car[];
  setFilteredCars: (cars: Car[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  refreshCars: () => Promise<void>;
};

const CarsContext = createContext<CarsContextType | undefined>(undefined);

export const CarsProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get('/');
      setCars(res.data);
      setFilteredCars(res.data);
    } catch (err) {
      setError('Failed to fetch cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshCars = async () => {
    await fetchCars();
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <CarsContext.Provider 
      value={{ 
        cars, 
        filteredCars, 
        setFilteredCars,
        loading,
        setLoading,
        error,
        refreshCars
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarsContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};