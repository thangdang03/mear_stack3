import './App.scss';
import Homepage from './component/home/home.page';
import Login from './component/login/login.page';
import Register from './component/retgister/register.page';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import {Provider}from"react-redux";
import { store } from './redux/store';
import Detail from './component/detail/detail.page';
import Product from './component/product/product.page';
import Search from './component/search_product/search_product';
import Edit from './component/form/edit.from';
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter >
          <Routes>
             <Route path="/Login" element={<Login/>}/>
             <Route path="/" element={<Homepage/>}/>
             <Route path="/register" element={<Register/>}/>
             <Route path="/product" element={<Product/>}/>
             <Route path="/product/edit/:id" element={<Edit/>}/>
             <Route path="/product/search/:keysearch" element={<Search/>}/>
             <Route path="/product/:id" element={<Detail/>}/>

          </Routes>
      
    </BrowserRouter>
    </Provider>
  );
}

export default App;
