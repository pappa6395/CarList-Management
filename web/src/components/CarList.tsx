import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/carApi';
import { toast } from 'react-toastify';
import { ChevronLeft, ChevronRight, LayoutGrid, List, Plus, Search } from 'lucide-react';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
import { useCars } from '../context/carContext';
import { Car } from '../lib/types';

const ITEMS_PER_PAGE = 9;

const CarList = () => {

  const { 
    cars, 
    filteredCars: contextFilteredCars, 
    setFilteredCars, 
    refreshCars,
    loading: contextLoading,
    error: contextError
  } = useCars();

  const [showModal, setShowModal] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'list'>(() => {
    const savedMode = localStorage.getItem('viewMode');
    return (savedMode === 'card' || savedMode === 'list') ? savedMode : 'card';
  });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);
  
  // Combine context filtering with local search filtering
  const [locallyFilteredCars, setLocallyFilteredCars] = useState<Car[]>([]);

  const totalItems = locallyFilteredCars.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedCars = locallyFilteredCars.slice(
    (currentPage -1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  // Apply both context filters and local search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setLocallyFilteredCars(contextFilteredCars);
      setCurrentPage(1);
      return;
    }
    
    const filtered = contextFilteredCars.filter((car) =>
      `${car.brand} ${car.model} ${car.registrationNumber} ${car.notes}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setLocallyFilteredCars(filtered);
    setCurrentPage(1);
  }, [contextFilteredCars, searchQuery]);


  const confirmDeleteCar = (id: string) => {
    setSelectedCarId(id);
    setShowModal(true);
  };


  const handleDeleteCar = async (id: string) => {
    try {
      await API.delete(`/${id}`);
      await refreshCars();
      toast.success('Car deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete car. Please try again.');
    } finally {
      setShowModal(false);
      setSelectedCarId(null);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCars(cars);
      return;
    }
    const filtered = cars.filter((car) =>
      `${car.brand} ${car.model} ${car.registrationNumber} ${car.notes}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [cars]);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery, debouncedSearch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  if (contextLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (contextError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <p>{contextError}</p>
        <button 
          onClick={refreshCars}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="mb-6 pt-6">
        <h1 className="text-3xl text-center font-bold 
        text-blue-600 tracking-widest">
          CAR LIST
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className='size-4 text-gray-500' />
          </span>
          <input
            type="text"
            placeholder="Search cars..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-gray-600 focus:outline-none"
              onClick={() => setSearchQuery("")}
            >

              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-end items-center p-4 gap-2">
        <div className="text-sm text-gray-500 mr-3">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} cars
        </div>
        <Link to="/add">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md cursor-pointer">
            <Plus className=''/>
          </button>
        </Link>
        <button 
          className={`px-3 py-2 rounded-md border cursor-pointer ${viewMode === 'card' 
            ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'}`}
          onClick={() => setViewMode('card')}
        >
          <LayoutGrid className={`${viewMode === 'card' ? 'text-white' : 'text-gray-500'}`}/>
        </button>
        <button 
          className={`px-3 py-2 rounded-md border cursor-pointer ${viewMode === 'list' 
            ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'}`}
          onClick={() => setViewMode('list')}
        >
          <List className={`${viewMode === 'list' ? 'text-white' : 'text-gray-500'}`} />
        </button>
      </div>
      
      <div>
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {paginatedCars.length > 0 ? (
              paginatedCars.map((car, index) => (
                <motion.div 
                  key={car._id} 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg 
                  flex flex-col justify-between transition ease-in"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                  duration: 3,
                  type: "keyframes",
                  delay: index * 0.1,
                  stiffness: 80,
                  damping: 8,
                  }}
                  onClick={() => navigate(`/cardetail/${car._id}`)}
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">{car.brand} {car.model}</h2>
                    <p className="text-gray-500 mb-2">Registration: {car.registrationNumber}</p>
                  </div>
                  
                  <div>
                    {car.notes ? (
                      <p className="text-gray-400 text-sm line-clamp-3">{car.notes}</p>
                    ) : (
                      <p className="text-gray-400 text-sm line-clamp-3">No notes available.</p>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 gap-2">
                    <Link to={`/cardetail/${car._id}`}>
                      <button className="text-blue-500 hover:underline text-sm cursor-pointer">
                        View
                      </button>
                    </Link>
                    <div className='flex gap-2'>
                      <Link to={`/edit/${car._id}`}>
                        <button className="text-green-500 hover:underline text-sm cursor-pointer">
                          Edit
                        </button>
                      </Link>
                      <button 
                        className="text-red-500 hover:underline text-sm cursor-pointer"
                        onClick={() => confirmDeleteCar(car._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full flex flex-col items-center justify-center text-gray-400 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0v-6a6 6 0 00-6-6V5a2 2 0 10-4 0v2a6 6 0 00-6 6v6h4" />
                </svg>
                <p className="text-lg">No cars found.</p>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your search terms 🚗</p>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-md overflow-hidden shadow-md mx-4 mt-2">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Brand</th>
                  <th className="hidden sm:grid px-6 py-3 text-sm font-medium text-gray-600">Registration</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Model</th>
                  <th className="hidden md:grid px-10 py-3 text-sm font-medium text-gray-600">Notes</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">View</th>
                  <th className="hidden md:grid px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCars && paginatedCars.length > 0 ? (
                  paginatedCars.map((car) => (
                    <motion.tr 
                      key={car._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{car.brand}</td>
                      <td className="hidden sm:grid px-6 py-4">{car.registrationNumber}</td>
                      <td className="px-6 py-4">{car.model}</td>
                      <td className="hidden md:grid px-10 py-4">{car.notes}</td>
                      <td className="px-6 py-4">
                        <Link to={`/cardetail/${car._id}`}>
                          <button className="text-blue-500 hover:underline text-sm cursor-pointer">
                            View
                          </button>
                        </Link>
                      </td>
                      <td className="hidden px-6 py-4 md:flex gap-2">
                        <div className="flex justify-end gap-4">
                          <Link to={`/edit/${car._id}`}>
                            <button className="text-blue-500 hover:underline text-sm cursor-pointer">
                              Edit
                            </button>
                          </Link>
                          <button 
                            className="text-red-500 hover:underline text-sm cursor-pointer"
                            onClick={() => confirmDeleteCar(car._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr 
                    key="no-cars-found"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-center" colSpan={5}>
                      No cars found.
                    </td>
                  </motion.tr>
                )
                }
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center my-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md mx-1 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-md mx-1 cursor-pointer ${currentPage === page 
                ? 'bg-blue-600 text-white' 
                : 'text-blue-600 hover:bg-blue-100'}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md mx-1 cursor-pointer ${currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-blue-600 hover:bg-blue-100'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
     
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className='bg-white rounded-lg p-8 w-full max-w-md mx-4 shadow-lg animate-fadeIn'>
            <div className=''>
              <h2 className='text-lg font-semibold text-gray-800 mb-4 text-center'>
                Are you absolutely sure?
              </h2>
              <p className='text-gray-600 text-center mb-6'>
                This action cannot be undone. This will permanently delete selected car information
              </p>
            </div>
            <div className='flex justify-end gap-4'>
              <button 
                onClick={() => setShowModal(false)}
                className='px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer'
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (selectedCarId) {
                    handleDeleteCar(selectedCarId);
                  }
                }}
                className='px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition cursor-pointer'
              >
                Delete
              </button>
            </div>
          </div> 
        </div>
      )}
    </div>
  );
};

export default CarList;
