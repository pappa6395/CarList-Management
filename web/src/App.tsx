import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import EditCar from './components/EditCar';
import Layout from './components/global/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CarsProvider } from './context/carContext';
import CarCard from './components/carCard';


function App() {
  return (
    <CarsProvider>
        <Router>
          <ToastContainer 
              position="top-center" 
              autoClose={3000} 
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
          <Layout>
            <Routes>
              <Route path="/" element={<CarList />} />
              <Route path="/add" element={<AddCar />} />
              <Route path="/edit/:id" element={<EditCar />} />
              <Route path="/cardetail/:id" element={<CarCard />} />
            </Routes>
          </Layout>
        </Router>
    </CarsProvider>
    
  );
}

export default App;