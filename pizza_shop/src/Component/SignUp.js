import React,{useState} from 'react'
import { Link} from 'react-router-dom';
function SignUp() {
  const [values,setvalues]=useState({name:"",email:"",password:"",geolocation:""})
  const handelSubmit=async(e)=>{
       e.preventDefault();
       const response=await fetch('http://localhost:5000/api/createuser',{
        method :'POST',
        headers :{
          'Content-Type' : 'Application/json'
        },
        body:JSON.stringify({name:values.name,email:values.email,password:values.password,location:values.geolocation})
       });
       const data= await response.json();
       console.log(data);

       if(!data.success){
         alert("Enter valid Entity");
       }

  }
  const Onchange=(event)=>{
     setvalues({...values,[event.target.name]:event.target.value});

  }
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" name='name' value={values.name} onChange={Onchange} />
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" name='email' value={values.email} onChange={Onchange} />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" name='password' value={values.password} onChange={Onchange}  />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example4cd" class="form-control" name='geolocation' value={values.geolocation} onChange={Onchange}  />
                            <label class="form-label" htmlFor="form3Example4cd">Address</label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" onClick={handelSubmit} className="btn btn-primary btn-lg m-1" style={{ width: "150px", height: "60px" }}>Register</button>
                          <Link to='/login' className="btn btn-danger btn-lg m-1" style={{ width: "250px", height: "60px" }}>Already User</Link>
                        </div>


                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="loading" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp;
