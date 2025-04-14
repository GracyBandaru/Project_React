import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Link
import MainLayout from './components/MainLayout/MainLayout';
import Hero from './components/Hero/Hero';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import AboutLayout from './components/About/AboutLayout';
import Testimonials from './components/Testimonials/Testimonials';
import Team from './components/Team/Team';
import Press from './components/Press/Press';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

// Authentication Components
import RentLogin from './components/Auth/RentLogin';
import RentRegister from './components/Auth/RentRegister';
import SellLogin from './components/Auth/SellLogin';
import SellRegister from './components/Auth/SellRegister';

// Owner Dashboard Components
import OwnerLayout from './components/OwnerDashboard/OwnerLayout';
import OwnerDashboard from './components/OwnerDashboard/DashboardHome';
import OwnerProfile from './components/OwnerDashboard/Profile';
import MyProperties from './components/OwnerDashboard/MyProperties';
import AddProperty from './components/OwnerDashboard/AddProperty';
import RentalApplications from './components/OwnerDashboard/RentalApplications';
import LeaseAgreements from './components/OwnerDashboard/LeaseAgreements';
import Notifications from './components/OwnerDashboard/Notifications';
import EditProfile from './components/OwnerDashboard/EditProfile';
import DeleteProfile from './components/OwnerDashboard/DeleteProfile';
import UploadDocument from './components/OwnerDashboard/UploadDocument';
import UpdateProperty from './components/OwnerDashboard/UpdateProperty';
import DeleteProperty from './components/OwnerDashboard/DeleteProperty';
import OwnerLogin from './components/Auth/SellLogin'; // Corrected import
import OwnerRegister from './components/Auth/SellRegister'; // Corrected import

// Tenant Dashboard Components
import TenantLayout from './components/TenantDashboard/TenantLayout';
import TenantDashboard from './components/TenantDashboard/DashboardHome';
import TenantProfile from './components/TenantDashboard/TenantProfile';
import PropertySearch from './components/TenantDashboard/PropertySearch';
import MyApplications from './components/TenantDashboard/MyApplications';
import MyLeases from './components/TenantDashboard/MyLeases';
import Payments from './components/TenantDashboard/Payments';
// import PropertyDetails from './components/TenantDashboard/PropertyDetails';

import './App.css';
import RentalApplicationForm from './components/TenantDashboard/RentalApplicationForm'; // Import the RentalApplicationForm

function App() {
    return (
        <Router>
            <ScrollToTop />
            <ErrorBoundary>
                <Routes>
                    {/* Public routes with MainLayout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Hero />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/reviews" element={<Testimonials />} />


                        {/* Authentication Routes */}
                        <Route path="/rent-login" element={<RentLogin />} />
                        <Route path="/rent-register" element={<RentRegister />} />
                        <Route path="/sell-login" element={<SellLogin />} />
                        <Route path="/sell-register" element={<SellRegister />} />
                       

                        {/* About section nested routes */}
                        <Route path="/about" element={<AboutLayout />}>
                            <Route index element={<About />} />
                            <Route path="team" element={<Team />} />
                            <Route path="press" element={<Press />} />
                        </Route>
                    </Route>

                    {/* Owner Dashboard Routes */}
                    <Route path="/owner" element={<OwnerLayout />}>
                        <Route index element={<OwnerDashboard />} />
                        <Route path="profile" element={<OwnerProfile />} />
                        <Route path="properties" element={<MyProperties />} />
                        <Route path="add-property" element={<AddProperty />} />
                        <Route path="edit-property/:id" element={<UpdateProperty />} /> {/* Corrected path */}
                        <Route path="delete-property/:id" element={<DeleteProperty />} />
                        <Route path="applications" element={<RentalApplications />} />
                        <Route path="leases" element={<LeaseAgreements />} />
                        <Route path="upload-document/:id" element={<UploadDocument />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="editProfile" element={<EditProfile />} />
                        <Route path="deleteProfile" element={<DeleteProfile />} />
                    </Route>

                    {/* Tenant Dashboard Routes */}
                    <Route path="/tenant" element={<TenantLayout />}>
                        <Route index element={<TenantDashboard />} />
                        <Route path="profile" element={<TenantProfile />} />
                        <Route path="search" element={<PropertySearch />} />
                        <Route path="applications" element={<MyApplications />} />
                        <Route path="leases" element={<MyLeases />} />
                        <Route path="payments" element={<Payments />} />
                       {/* Tenant Dashboard Routes */}

  {/* ... other tenant routes ... */}
  <Route path="apply/:propertyId" element={<RentalApplicationForm />} />
  {/* ... */}

                        {/* Optional: A general apply route if needed */}
                        <Route path="apply" element={<RentalApplicationForm />} />
                    </Route>

                    {/* 404 - Outside MainLayout */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}

export default App;