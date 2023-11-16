import React, { useEffect, useState } from 'react';
import Navbaar from '../Component/Navbaar';
import Footer from '../Component/Footer';
import Card from '../Component/Card';
// import Carousel from '../Component/Carousel';

function Home() {
  const [search, setsearch] = useState("");
  const [foodcat, setfoodcat] = useState([]);
  const [fooditems, setfooditems] = useState([]);

  const LoadData = async () => {
    const response = await fetch('http://localhost:5000/api/fooddata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Fix the typo here
      },
    });

    const data = await response.json(); // Add await here
    setfoodcat(data[1]);
    setfooditems(data[0]);

    // console.log(data[0], data[1]);
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <>
      <Navbaar />
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner" style={{ zIndex: "10" }}>
            <div class="container mt-4">
              <div class="row">
                <div class="col-md-6 offset-md-3">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search..." value={search}  onChange={(e)=>{setsearch(e.target.value)}}/>
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="button">Search</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <img className="d-block m-5 w-100" style={{ height: '600px' }} src="https://freerangestock.com/sample/140597/pizza-on-dark-table-top-background--with-copyspace.jpg" alt="First slide" />

            </div>
            <div className="carousel-item">
              <img className="d-block w-100" style={{ height: '600px' }} src="https://www.restaurantpizzeriarimini.com/menutouch/img/carousel-2.jpg" alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" style={{ height: '600px' }} src="https://i.ytimg.com/vi/AdRQkL0KvDk/mqdefault.jpg" alt="Third slide" />
            </div>

          </div>


          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>


      </div>

    

      <div className='container'>
        {Array.isArray(foodcat) && foodcat.length !== 0 ? (

          foodcat.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {
                  Array.isArray(fooditems) && fooditems.length > 0 ? (fooditems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))).map
                    (filteritems => {
                      return (
                        <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodyitem={filteritems}
                            options={filteritems.options[0]}
                            >
                          </Card>
                        </div>
                      )
                    }) : <div>No Items found</div>
                }
              </div>
            );
          })
        ) : (
          <div>"No such items in foodcategory"</div>
        )}


      </div>
      <Footer />
    </>
  );
}

export default Home;
