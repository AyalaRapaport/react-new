import './App.css';
import Delivers from './Componets/delivers';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Componets/HomePage';
import CourierDetails from './Componets/CourierDetails';
import Logo from './Componets/Logo';
import PersonalArea from './Componets/PersonalArea';
import ChooseLocation from './Componets/ChooseLocation';
import RecognizeLocation from './Componets/RecognizeLocation';
import SignIn from './Componets/SignIn';
import SignUp from './Componets/SignUp';
import DeliveryDetails from './Componets/DeliveryDetails';
import SetCourierDetails from './Componets/SetCourierDetails';
import Products from './Componets/products';
import ProductEdit from './Componets/ProductEdit';
import Categories from './Componets/Categories';
import Stores from './Componets/Stores';
import AddProduct from './Componets/AddProduct';
import FilterCategory from './Componets/FilterCategory';
import Cart from './Componets/Cart';
import Navbar from './Componets/Navbar';
import CalculateDistance from './Componets/CalculateDistance';
import OrdersLocation from './Componets/OrdersLocation';
import AddCategory from './Componets/AddCategory';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='courierDetails' element={<CourierDetails />} />
        <Route path='homePage' element={<HomePage />} />
        <Route path='cart' element={<Cart />} />
        <Route path='navbar' element={<Navbar />} />
        <Route path='signIn' element={<SignIn />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path='addCategory' element={<AddCategory />} />
        <Route path='ordersLocation' element={<OrdersLocation />} />
        <Route path='products/:id' element={<Products />} />
        <Route path='categories' element={<Categories />} />
        <Route path='stores' element={<Stores />} />
        <Route path='deliveryDetails' element={<DeliveryDetails />} />
        <Route path='productEdit' element={<ProductEdit />} />
        <Route path='addProduct/:storeId' element={<AddProduct />} />
        <Route path='filterCategory/:categoryId' element={<FilterCategory />} />
        <Route path='/setCourierDetails' element={<SetCourierDetails />} />
        <Route path='calculateDistance' element={<CalculateDistance />} />

        <Route path='delivers/:id' element={<Delivers />} />
        <Route path='recognizeLocation/:location' element={<RecognizeLocation />} />
        <Route path='chooseLocation/:showMap' element={<ChooseLocation />} />
        {/* </Route> */}

        <Route path='logo' element={<Logo />} />
        <Route path='' element={<HomePage />} />
        <Route path='*' element={<h1> not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
