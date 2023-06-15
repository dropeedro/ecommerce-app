import {Routes, Route} from 'react-router-dom'
import Contacto from './pages/Contacto';
import Error from './pages/Error';
import Registro from './pages/Auth/Registro';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateFunction from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import ContadorRoute from './components/Routes/ContadorRoute';
import Shipping from './pages/Contador/Shipping';
import RegisterPayment from './pages/Contador/RegisterPayment';
import ContadorDashboard from './pages/Contador/ContadorDashboard';
import CategoryProduct from './pages/CategoryProduct';
import Cart from './pages/Cart';
import SingleProductPage from './components/SingleProductPage/SingleProductPage';
import Category from './components/Category/Category';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Order from './components/Checkout/Order/Order';
import LoginCheckout from './pages/Auth/LoginCheckout';
import Catalogo from './components/Catalogo/Catalogo';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/catalogo' element={<Catalogo/>}/>
        <Route path='/categories' element={<Category/>}/>
        <Route path='/category/:slug' element={<CategoryProduct/>}/>
        <Route path='/product/:slug' element={<SingleProductPage />}/>
        <Route path='/dashboard' element={<PrivateFunction/>}>
          <Route path="user" element={<Dashboard/>}/>
          <Route path="user/profile" element={<Profile/>}/>
          <Route path="user/orders" element={<Orders/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/create-product" element={<CreateProduct/>}/>
          <Route path="admin/products/:slug" element={<UpdateProduct/>}/>
          <Route path="admin/products" element={<Products/>}/>
          <Route path="admin/users" element={<Users/>}/>
        </Route>
        <Route path='/dashboard' element={<ContadorRoute/>}>
          <Route path="contador" element={<ContadorDashboard/>}/>
          <Route path="contador/register-payment" element={<RegisterPayment/>}/>
          <Route path="contador/shipping" element={<Shipping/>}/>
        </Route>
        <Route path='/register' element={<Registro/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/login-checkout' element={<LoginCheckout/>}/>
        <Route path='/catalogo' element={<Catalogo/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/*' element={<Error/>}/>
      </Routes>

    </>
  );
}

export default App;
