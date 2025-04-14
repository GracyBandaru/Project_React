import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FloatingHomeButton from '../FloatingHomeButton/FloatingHomeButton';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      {!isHomePage && <FloatingHomeButton />}
    </div>
  );
};

export default MainLayout;