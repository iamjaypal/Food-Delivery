import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
function Navbaar() {
  const data=useCart();
  const navigate=useNavigate();
  const handellogout=()=>{
    localStorage.removeItem("authToken");
    navigate('/login');
  }
  const [cartview ,setcartview]=useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light  navbar-text fs-6">
        <div className="container-fluid">
          <Link className="navbar-brand fs-4" to="/">IndianPizza</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mx-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>

              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myorder">MyOrder</Link>
                </li>
                : ""
              }
            </ul>

            {
              (!localStorage.getItem("authToken")) ?
                <div className='d-flex'>
                  <Link className="btn btn-danger mx-1" to="/signup">SignUp</Link>
                  <Link className="btn btn-danger mx-1" to="/login">Login</Link>
                </div>
                :
                <div className='btn d-flex'>
                  <div className='btn btn-success mx-2' onClick={()=>setcartview(true)}>
                  MyCart {"   "}
                  <Badge pill bg="danger">{data.length}</Badge>
                  </div>
                  {cartview ?<Modal onClose={()=>setcartview(false)}><Cart/></Modal>:null}
                  <div className='btn btn-danger mx-2' onClick={handellogout}>
                    logout
                  </div>
                </div>

            }


          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbaar
