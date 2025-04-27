
import { useCars } from '../../context/carContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
  };

const Layout = ({ children }: LayoutProps) => {

const { cars, setFilteredCars } = useCars();


  return (
    <div>
      <Sidebar cars={cars} onFilterChange={setFilteredCars} />
      <div className="flex flex-col">
        <Navbar />
        <main className="pt-16 transition-all duration-300
          md:ml-64"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
