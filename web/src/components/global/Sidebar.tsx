import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { ListFilter, Menu } from 'lucide-react';
import { Car } from '../../lib/types';



export type FiltersType = {
    brand: string;
    model: string;
    registrationNumber: string;
};
  
type BrandModelsMap = {
    [brand: string]: string[];
};


const Sidebar = ({ cars, onFilterChange }: { cars: Car[]; onFilterChange: (filteredCars: Car[]) => void }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { name: 'Car List', path: '/', icon: <HomeOutlined /> },
    { name: 'Add Car', path: '/add', icon: <PlusOutlined /> },
  ];
  
  const [filters, setFilters] = useState<FiltersType>({
    brand: '',
    model: '',
    registrationNumber: '',
  });

  const [brandModelsMap, setBrandModelsMap] = useState<BrandModelsMap>({});
  const [brandRegNumMap, setBrandRegNumMap] = useState<BrandModelsMap>({});


  useEffect(() => {
    const bmMap: BrandModelsMap = {};
    const brMap: BrandModelsMap = {};
    
    cars.forEach(car => {
      if (!bmMap[car.brand]) {
        bmMap[car.brand] = [];
      }
      if (!bmMap[car.brand].includes(car.model)) {
        bmMap[car.brand].push(car.model);
      }

      if (!brMap[car.brand]) {
        brMap[car.brand] = [];
      }
      if (!brMap[car.brand].includes(car.registrationNumber)) {
        brMap[car.brand].push(car.registrationNumber);
      }
    });

    setBrandModelsMap(bmMap);
    setBrandRegNumMap(brMap);
  }, [cars]);

  useEffect(() => {
    const filteredCars = cars.filter(car => {
      return (
        (filters.brand === '' || car.brand === filters.brand) &&
        (filters.model === '' || car.model === filters.model) &&
        (filters.registrationNumber === '' || 
         car.registrationNumber.toLowerCase().includes(filters.registrationNumber.toLowerCase()))
      );
    });
    
    onFilterChange(filteredCars);
  }, [filters, cars, onFilterChange]);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (field: keyof FiltersType, value: string) => {
    setFilters(prev => {
      if (field === 'brand') {
        return {
          ...prev,
          brand: value,
          model: '',
          registrationNumber: ''
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

    // Get unique brands from cars
    const brands = [...new Set(cars.map(car => car.brand))].sort();

    // Get models for selected brand
    const models = filters.brand ? brandModelsMap[filters.brand] || [] : [];

    // Get registration numbers for selected brand
    const registrationNumbers = filters.brand ? brandRegNumMap[filters.brand] || [] : [];

  return (
    <>
      {/* Overlay when mobile sidebar open */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-30 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}

        <div className={`h-screen bg-white shadow-lg fixed top-0 left-0 z-40
            transition-all duration-300 ease-in-out 
            ${isOpen ? 'w-64' : 'w-64'}
            ${isMobile && !isOpen ? '-translate-x-64' : 'translate-x-0'}
        `}>
            <div className="flex items-center justify-between p-4">
                <h1 className="text-2xl font-bold text-blue-600">
                {isOpen ? 'CarList' : '🚗'}
                </h1>
                <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-gray-800 md:hidden"
                >
                ✖
                </button>
            </div>

            <nav className="mt-8 flex flex-col gap-4 p-4">
                {menuItems.map((item) => (
                <Link 
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 p-2 rounded-md transition
                    ${location.pathname === item.path ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}
                    `}
                    onClick={() => isMobile && setIsOpen(false)} // auto close on mobile
                >
                    <span className="text-xl">{item.icon}</span>
                    {isOpen && <span className="text-md">{item.name}</span>}
                </Link>
                ))}
            </nav>
            
            <div className="p-4">
                <div className='flex items-center gap-2 mb-4 pl-1.5'>
                  <ListFilter className='size-6 text-gray-600' />
                  <h2 className="text-base font-semibold">Filters</h2>
                </div>

                <div className="flex flex-col gap-4 px-2">
                    {/* Brand Filter */}
                    <div className='space-y-2'>
                    <label className="block font-medium">Brand</label>
                    <select
                        className="w-full p-2 border rounded cursor-pointer"
                        value={filters.brand}
                        onChange={(e) => handleFilterChange('brand', e.target.value)}
                    >
                        <option value="">All Brands</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    </div>
                    
                    {/* Model Filter - only shown when brand is selected */}
                    {filters.brand && (
                    <div className='space-y-2'>
                        <label className="block font-medium">Model</label>
                        <select
                        className="w-full p-2 border rounded cursor-pointer"
                        value={filters.model}
                        onChange={(e) => handleFilterChange('model', e.target.value)}
                        disabled={!filters.brand}
                        >
                        <option value="">All Models</option>
                        {models.map(model => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                        </select>
                    </div>
                    )}

                    {/* Registration Number Filter - only shown when model is selected */}
                    {filters.brand && (
                      <div className='space-y-2'>
                        <label className="block font-medium">Registration Number</label>
                        <select
                          className="w-full p-2 border rounded cursor-pointer"
                          value={filters.registrationNumber}
                          onChange={(e) => handleFilterChange('registrationNumber', e.target.value)}
                        >
                          <option value="">All Registration Numbers</option>
                          {registrationNumbers.map(regNum => (
                            <option key={regNum} value={regNum}>{regNum}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Clear Filters Button */}
                    <button
                    className="mt-4 p-2 bg-gray-200 rounded 
                    hover:bg-gray-300 cursor-pointer"
                    onClick={() => setFilters({
                        brand: '',
                        model: '',
                        registrationNumber: ''
                    })}
                    >
                    Clear Filters
                    </button>
                </div>
            </div>
        </div>

      {/* Hamburger menu button for mobile */}
      {isMobile && !isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white px-2 py-1.5 rounded-md shadow-md"
        >
          <Menu />
        </button>
      )}
    </>
  );
};

export default Sidebar;
