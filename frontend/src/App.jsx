import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './components/Root';
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Categories from './components/Categories';
import Products from './components/Products';
import Suppliers from './components/Suppliers';
import Orders from './components/Orders';
import Users from './components/Users';
import Profile from './components/Profile';
import DashboardHome from "./components/DashboardHome";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route 
        path="/admin-dashboard"
         element={<ProtectedRoutes requireRole={["Admin"]}>
          <Dashboard />
          </ProtectedRoutes>
           } >
             
             <Route
  index
  element={<DashboardHome />}
/>
              
    


               <Route 
               path="categories"
               element={<Categories />} 
               />
               <Route 
               path="products"
               element={<Products />} 
               />
               <Route 
               path="suppliers"
               element={<Suppliers />} 
               />
               <Route 
               path="orders"
               element={<Orders />} 
               />
               <Route 
               path="users"
               element={<Users />} 
               />
               <Route
                path="profile" 
                element={<Profile />} />
              
              
              
               </Route>
    
        <Route path="/customer/dashboard" element={<h1>customer dashboard</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/unauthorized" element={<p>Unauthorized Access</p>} />
      </Routes>
    </Router>
  );
}

export default App;