

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md p-4 fixed top-0 left-0 z-10">
      <div className="flex items-center gap-3 text-xl font-semibold text-blue-600 ml-20 md:ml-64 transition-all duration-300">
        <img 
          src="/car-rental.png"
          alt="logo"
          className="h-8 w-8"
        />
        <p>CarList Dashboard</p>
      </div>
    </nav>
  );
};

export default Navbar;
