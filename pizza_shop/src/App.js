import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home';
import { CartProvider } from './Component/ContextReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import Myorder from './screens/Myorder';


function App() {
  return (
    
    <CartProvider>

        <Router>
          <div>

            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<SignUp />} />
              <Route exact path='/myorder' element={<Myorder />} />
            </Routes>

          </div >
        </Router>
    </CartProvider>
      


    
  );
}

export default App;
